import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-checkbox')
export class LitCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .checkbox-container.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #1ea7fd;
    }

    input[type="checkbox"]:disabled {
      cursor: not-allowed;
    }

    label {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }

    label.disabled {
      cursor: not-allowed;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  checked = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  value = '';

  render() {
    return html`
      <div class="checkbox-container ${this.disabled ? 'disabled' : ''}">
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          .value=${this.value}
          @change=${this._handleChange}
        />
        ${this.label ? html`<label class="${this.disabled ? 'disabled' : ''}">${this.label}</label>` : ''}
      </div>
    `;
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent('checkbox-change', {
      detail: { checked: input.checked, value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-checkbox': LitCheckbox;
  }
}
