import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-alert')
export class LitAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .alert {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .alert-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .alert-icon {
      font-size: 20px;
    }

    .alert-message {
      flex: 1;
    }

    .alert-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .alert.info {
      background-color: #e3f2fd;
      color: #0277bd;
      border-left: 4px solid #0277bd;
    }

    .alert.success {
      background-color: #e8f5e9;
      color: #2e7d32;
      border-left: 4px solid #2e7d32;
    }

    .alert.warning {
      background-color: #fff3e0;
      color: #e65100;
      border-left: 4px solid #e65100;
    }

    .alert.error {
      background-color: #ffebee;
      color: #c62828;
      border-left: 4px solid #c62828;
    }

    .alert-close:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `;

  @property({ type: String })
  message = '';

  @property({ type: String })
  variant: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: Boolean })
  dismissible = false;

  render() {
    const icons = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕'
    };

    return html`
      <div class="alert ${this.variant}">
        <div class="alert-content">
          <span class="alert-icon">${icons[this.variant]}</span>
          <div class="alert-message">
            ${this.message}
            <slot></slot>
          </div>
        </div>
        ${this.dismissible ? html`
          <button class="alert-close" @click=${this._handleDismiss}>×</button>
        ` : ''}
      </div>
    `;
  }

  private _handleDismiss() {
    this.dispatchEvent(new CustomEvent('alert-dismiss', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-alert': LitAlert;
  }
}
