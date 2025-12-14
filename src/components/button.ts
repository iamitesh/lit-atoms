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
  a11yCheckLabeling
} from '../agent/atom-helpers.js';

@customElement('lit-button')
export class LitButton extends LitElement implements AtomAgentReady {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 700;
      border: 0;
      border-radius: 3em;
      cursor: pointer;
      display: inline-block;
      line-height: 1;
      transition: all 0.2s ease-in-out;
    }

    button:hover {
      opacity: 0.8;
    }

    button:active {
      transform: scale(0.98);
    }

    .primary {
      color: white;
      background-color: #1ea7fd;
    }

    .secondary {
      color: #333;
      background-color: transparent;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
    }

    .small {
      font-size: 12px;
      padding: 10px 16px;
    }

    .medium {
      font-size: 14px;
      padding: 11px 20px;
    }

    .large {
      font-size: 16px;
      padding: 12px 24px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  @property({ type: String })
  label = 'Button';

  @property({ type: String })
  variant: 'primary' | 'secondary' = 'primary';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  disabled = false;

  @property({ attribute: false })
  policy?: AtomPolicyFn;

  private _hasEmittedUsage = false;

  connectedCallback() {
    super.connectedCallback();
    
    // Emit usage event once on first connection
    if (!this._hasEmittedUsage) {
      this.updateComplete.then(() => {
        emitAtomEvent(this, {
          type: 'atoms.usage',
          actor: 'user',
          payload: {
            variant: this.variant,
            size: this.size,
            label: this.label
          }
        });
        
        // Check a11y
        const issues = a11yCheckLabeling(this, {
          requiresLabel: true,
          labelTarget: this.shadowRoot?.querySelector('button') || null
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
      value: null,
      disabled: this.disabled,
      semantics: readSemanticsFromDataset(this)
    };
  }

  getActions(): AtomActionDescriptor[] {
    return [
      {
        id: 'click',
        label: 'Click button',
        destructive: false,
        requiresConfirm: false
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
          message: 'Button is disabled'
        }
      };
    }
    
    // Apply policy if present
    const policyResult = applyPolicyIfAny(this.policy, actionId, context);
    if (policyResult) {
      return policyResult;
    }
    
    // Perform the action
    if (actionId === 'click') {
      this._performClick(context);
      
      // Emit action event
      emitAtomEvent(this, {
        type: 'atoms.action',
        actor: context.actor,
        payload: {
          actionId: 'click',
          params: params || {},
          result: { ok: true }
        }
      });
      
      return { ok: true };
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
      <button
        class="${this.variant} ${this.size}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${this.label}
      </button>
    `;
  }

  private _handleClick(e: Event) {
    // Emit traditional event for backward compatibility
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
    
    // Emit atom action event
    emitAtomEvent(this, {
      type: 'atoms.action',
      actor: 'user',
      payload: {
        actionId: 'click',
        params: {},
        result: { ok: true }
      }
    });
  }

  private _performClick(context: AtomInvokeContext) {
    // Trigger the same behavior as a user click
    // Emit the traditional event
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: null, invokedBy: context.actor },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
}
