import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
