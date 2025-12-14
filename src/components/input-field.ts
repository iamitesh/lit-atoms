import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  AtomAgentReady,
  AtomBaseState,
  AtomActionDescriptor,
  AtomInvokeContext,
  AtomInvokeResult,
  AtomPolicyFn
} from '../agent/atom-types.js';
import {
  emitAtomEvent,
  readSemanticsFromDataset,
  applyPolicyIfAny,
  a11yCheckLabeling,
  redactValue
} from '../agent/atom-helpers.js';

@customElement('lit-input-field')
export class LitInputField extends LitElement implements AtomAgentReady {
  static styles = css`
    :host {
      display: block;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    label {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    input {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
    }

    input:focus {
      border-color: #1ea7fd;
    }

    input:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    input.error {
      border-color: #ff4444;
    }

    .helper-text {
      font-size: 12px;
      color: #666;
    }

    .error-text {
      font-size: 12px;
      color: #ff4444;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  type: 'text' | 'email' | 'password' | 'number' = 'text';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  helperText = '';

  @property({ type: String })
  errorText = '';

  @property({ attribute: false })
  policy?: AtomPolicyFn;

  private _hasEmittedUsage = false;
  private _previousValue = '';

  connectedCallback() {
    super.connectedCallback();
    
    // Emit usage event once on first connection
    if (!this._hasEmittedUsage) {
      this.updateComplete.then(() => {
        emitAtomEvent(this, {
          type: 'atoms.usage',
          actor: 'user',
          payload: {
            type: this.type,
            label: this.label,
            required: this.required
          }
        });
        
        // Check a11y
        const inputEl = this.shadowRoot?.querySelector('input');
        const issues = a11yCheckLabeling(this, {
          requiresLabel: !!this.label || this.required,
          labelTarget: inputEl || null
        });
        
        if (issues.length > 0) {
          emitAtomEvent(this, {
            type: 'atoms.a11y',
            actor: 'user',
            payload: {
              issue: issues[0].code,
              severity: issues[0].severity,
              suggestion: issues[0].message
            }
          });
        }
        
        this._hasEmittedUsage = true;
      });
    }
  }

  // Agent-ready interface implementation
  getState(): AtomBaseState {
    return {
      value: this.value,
      disabled: this.disabled,
      readonly: false,
      error: this.errorText || undefined,
      valid: !this.errorText,
      semantics: readSemanticsFromDataset(this)
    };
  }

  getActions(): AtomActionDescriptor[] {
    return [
      {
        id: 'setValue',
        label: 'Set input value',
        params: [
          {
            name: 'value',
            type: 'string',
            required: true
          }
        ]
      },
      {
        id: 'clear',
        label: 'Clear input value'
      },
      {
        id: 'focus',
        label: 'Focus the input'
      }
    ];
  }

  invokeAction(
    actionId: string,
    params?: Record<string, any>,
    ctx?: AtomInvokeContext
  ): AtomInvokeResult {
    const context = ctx || { actor: 'user' };
    
    // Check if action exists
    const actions = this.getActions();
    const action = actions.find(a => a.id === actionId);
    if (!action) {
      return {
        ok: false,
        error: {
          code: 'UNKNOWN_ACTION',
          message: `Action '${actionId}' not found`
        }
      };
    }
    
    // Check disabled state
    if (this.disabled) {
      return {
        ok: false,
        error: {
          code: 'COMPONENT_DISABLED',
          message: 'Input is disabled'
        }
      };
    }
    
    // Apply policy if present
    const policyResult = applyPolicyIfAny(this.policy, actionId, context);
    if (policyResult) {
      return policyResult;
    }
    
    // Perform the action
    if (actionId === 'setValue') {
      if (!params || params.value === undefined) {
        return {
          ok: false,
          error: {
            code: 'MISSING_PARAMETER',
            message: 'Parameter "value" is required'
          }
        };
      }
      
      const previousValue = this.value;
      this.value = params.value;
      
      // Emit change event
      emitAtomEvent(this, {
        type: 'atoms.change',
        actor: context.actor,
        payload: {
          value: redactValue(this.value, this),
          previousValue: redactValue(previousValue, this),
          valid: !this.errorText
        }
      });
      
      // Emit action event with redacted params for sensitive fields
      const sensitive = this.dataset.sensitive === 'true';
      emitAtomEvent(this, {
        type: 'atoms.action',
        actor: context.actor,
        payload: {
          actionId: 'setValue',
          params: sensitive ? { value: '[REDACTED]' } : params,
          result: { ok: true }
        }
      });
      
      return { ok: true };
    }
    
    if (actionId === 'clear') {
      const previousValue = this.value;
      this.value = '';
      
      // Emit change event
      emitAtomEvent(this, {
        type: 'atoms.change',
        actor: context.actor,
        payload: {
          value: '',
          previousValue: redactValue(previousValue, this),
          valid: !this.errorText
        }
      });
      
      // Emit action event
      emitAtomEvent(this, {
        type: 'atoms.action',
        actor: context.actor,
        payload: {
          actionId: 'clear',
          params: {},
          result: { ok: true }
        }
      });
      
      return { ok: true };
    }
    
    if (actionId === 'focus') {
      const inputEl = this.shadowRoot?.querySelector('input');
      if (inputEl) {
        inputEl.focus();
        
        // Emit action event
        emitAtomEvent(this, {
          type: 'atoms.action',
          actor: context.actor,
          payload: {
            actionId: 'focus',
            params: {},
            result: { ok: true }
          }
        });
        
        return { ok: true };
      }
      
      return {
        ok: false,
        error: {
          code: 'ELEMENT_NOT_FOUND',
          message: 'Input element not found'
        }
      };
    }
    
    return {
      ok: false,
      error: {
        code: 'UNKNOWN_ACTION',
        message: `Action '${actionId}' not implemented`
      }
    };
  }

  render() {
    return html`
      <div class="input-container">
        ${this.label ? html`<label>${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <input
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          class=${this.errorText ? 'error' : ''}
          @input=${this._handleInput}
        />
        ${this.errorText 
          ? html`<span class="error-text">${this.errorText}</span>`
          : this.helperText 
            ? html`<span class="helper-text">${this.helperText}</span>`
            : ''
        }
      </div>
    `;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const previousValue = this.value;
    this.value = input.value;
    
    // Emit traditional event for backward compatibility
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { value: input.value },
      bubbles: true,
      composed: true
    }));
    
    // Emit atom change event
    emitAtomEvent(this, {
      type: 'atoms.change',
      actor: 'user',
      payload: {
        value: redactValue(this.value, this),
        previousValue: redactValue(previousValue, this),
        valid: !this.errorText
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-input-field': LitInputField;
  }
}
