import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-dropdown')
export class LitDropdown extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .dropdown-container {
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

    select {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
      background-color: white;
      cursor: pointer;
    }

    select:focus {
      border-color: #1ea7fd;
    }

    select:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: Array })
  options: Array<{ label: string; value: string }> = [];

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  placeholder = 'Select an option';

  render() {
    return html`
      <div class="dropdown-container">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <select
          .value=${this.value}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        >
          ${this.placeholder ? html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>` : ''}
          ${this.options.map(option => html`
            <option value=${option.value} ?selected=${this.value === option.value}>
              ${option.label}
            </option>
          `)}
        </select>
      </div>
    `;
  }

  private _handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.dispatchEvent(new CustomEvent('dropdown-change', {
      detail: { value: select.value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dropdown': LitDropdown;
  }
}
