import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-input-field')
export class LitInputField extends LitElement {
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
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      font-size: ${unsafeCSS(theme.base.typography.body2.fontSize)};
      font-weight: ${unsafeCSS(theme.base.typography.fontWeightMedium)};
      color: ${unsafeCSS(theme.base.palette.text.primary)};
    }

    input {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      font-size: ${unsafeCSS(theme.base.typography.body1.fontSize)};
      padding: ${unsafeCSS(theme.base.spacing.sm)} ${unsafeCSS(theme.base.spacing.md)};
      border: 1px solid ${unsafeCSS(theme.base.palette.grey[300])};
      border-radius: ${unsafeCSS(theme.base.borderRadius.sm)};
      outline: none;
      transition: border-color ${unsafeCSS(theme.base.transitions.duration.short)}ms;
    }

    input:focus {
      border-color: ${unsafeCSS(theme.base.palette.primary.main)};
    }

    input:disabled {
      background-color: ${unsafeCSS(theme.base.palette.grey[100])};
      cursor: not-allowed;
    }

    input.error {
      border-color: ${unsafeCSS(theme.base.palette.error.main)};
    }

    .helper-text {
      font-size: ${unsafeCSS(theme.base.typography.caption.fontSize)};
      color: ${unsafeCSS(theme.base.palette.text.secondary)};
    }

    .error-text {
      font-size: ${unsafeCSS(theme.base.typography.caption.fontSize)};
      color: ${unsafeCSS(theme.base.palette.error.main)};
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
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { value: input.value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-input-field': LitInputField;
  }
}
