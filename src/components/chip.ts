import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-chip')
export class LitChip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .chip {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      padding: 6px 12px;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background-color: #e0e0e0;
      color: #333;
    }

    .chip.clickable {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .chip.clickable:hover {
      background-color: #d0d0d0;
    }

    .chip.primary {
      background-color: #1ea7fd;
      color: white;
    }

    .chip.success {
      background-color: #4caf50;
      color: white;
    }

    .chip.warning {
      background-color: #ff9800;
      color: white;
    }

    .chip.danger {
      background-color: #f44336;
      color: white;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .close-button:hover {
      opacity: 1;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';

  @property({ type: Boolean })
  removable = false;

  @property({ type: Boolean })
  clickable = false;

  render() {
    return html`
      <div 
        class="chip ${this.variant !== 'default' ? this.variant : ''} ${this.clickable ? 'clickable' : ''}"
        @click=${this._handleClick}
      >
        <span>${this.label}</span>
        ${this.removable ? html`
          <button class="close-button" @click=${this._handleRemove}>×</button>
        ` : ''}
      </div>
    `;
  }

  private _handleClick(e: Event) {
    if (this.clickable && !(e.target as HTMLElement).classList.contains('close-button')) {
      this.dispatchEvent(new CustomEvent('chip-click', {
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleRemove(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('chip-remove', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-chip': LitChip;
  }
}
