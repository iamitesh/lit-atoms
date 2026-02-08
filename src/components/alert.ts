import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-alert')
export class LitAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .alert {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      padding: ${unsafeCSS(theme.base.spacing.md)};
      border-radius: ${unsafeCSS(theme.base.borderRadius.sm)};
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-left: 4px solid;
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
      border-radius: ${unsafeCSS(theme.base.borderRadius.sm)};
      transition: background-color ${unsafeCSS(theme.base.transitions.duration.short)}ms;
    }

    .alert.info {
      background-color: ${unsafeCSS(theme.base.palette.info.light)}33;
      border-left-color: ${unsafeCSS(theme.base.palette.info.main)};
      color: ${unsafeCSS(theme.base.palette.info.dark)};
    }

    .alert.success {
      background-color: ${unsafeCSS(theme.base.palette.success.light)}33;
      border-left-color: ${unsafeCSS(theme.base.palette.success.main)};
      color: ${unsafeCSS(theme.base.palette.success.dark)};
    }

    .alert.warning {
      background-color: ${unsafeCSS(theme.base.palette.warning.light)}33;
      border-left-color: ${unsafeCSS(theme.base.palette.warning.main)};
      color: ${unsafeCSS(theme.base.palette.warning.dark)};
    }

    .alert.error {
      background-color: ${unsafeCSS(theme.base.palette.error.light)}33;
      border-left-color: ${unsafeCSS(theme.base.palette.error.main)};
      color: ${unsafeCSS(theme.base.palette.error.dark)};
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
