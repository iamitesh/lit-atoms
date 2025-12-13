import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-toggle')
export class LitToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .toggle-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .toggle-container.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .toggle-switch {
      position: relative;
      width: 48px;
      height: 24px;
      background-color: #ccc;
      border-radius: 24px;
      transition: background-color 0.3s;
      cursor: pointer;
    }

    .toggle-switch.checked {
      background-color: #1ea7fd;
    }

    .toggle-switch.disabled {
      cursor: not-allowed;
    }

    .toggle-slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.3s;
    }

    .toggle-switch.checked .toggle-slider {
      transform: translateX(24px);
    }

    input[type="checkbox"] {
      display: none;
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

  render() {
    return html`
      <div class="toggle-container ${this.disabled ? 'disabled' : ''}" @click=${this._handleClick}>
        <div class="toggle-switch ${this.checked ? 'checked' : ''} ${this.disabled ? 'disabled' : ''}">
          <div class="toggle-slider"></div>
        </div>
        ${this.label ? html`<label class="${this.disabled ? 'disabled' : ''}">${this.label}</label>` : ''}
        <input type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} />
      </div>
    `;
  }

  private _handleClick() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent('toggle-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-toggle': LitToggle;
  }
}
