import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-banner')
export class LitBanner extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .banner {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .banner-content {
      flex: 1;
    }

    .banner-title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 4px;
    }

    .banner-message {
      font-size: 14px;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 0 8px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .close-button:hover {
      opacity: 1;
    }

    .info {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .success {
      background-color: #e8f5e9;
      color: #388e3c;
    }

    .warning {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .error {
      background-color: #ffebee;
      color: #d32f2f;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  message = '';

  @property({ type: String })
  variant: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: Boolean })
  dismissible = false;

  @property({ type: Boolean })
  visible = true;

  render() {
    if (!this.visible) return html``;

    return html`
      <div class="banner ${this.variant}">
        <div class="banner-content">
          ${this.title ? html`<div class="banner-title">${this.title}</div>` : ''}
          <div class="banner-message">${this.message}</div>
        </div>
        ${this.dismissible ? html`
          <button class="close-button" @click=${this._handleDismiss}>×</button>
        ` : ''}
      </div>
    `;
  }

  private _handleDismiss() {
    this.visible = false;
    this.dispatchEvent(new CustomEvent('banner-dismiss', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-banner': LitBanner;
  }
}
