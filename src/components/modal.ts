import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-modal')
export class LitModal extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${unsafeCSS(theme.base.zIndex.modal)};
      animation: fadeIn ${unsafeCSS(theme.base.transitions.duration.short)}ms ${unsafeCSS(theme.base.transitions.easing.easeOut)};
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-content {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      background-color: ${unsafeCSS(theme.base.palette.background.default)};
      border-radius: ${unsafeCSS(theme.base.borderRadius.md)};
      max-width: 90%;
      max-height: 90vh;
      overflow: auto;
      box-shadow: ${unsafeCSS(theme.base.shadows.xl)};
      animation: slideDown ${unsafeCSS(theme.base.transitions.duration.standard)}ms ${unsafeCSS(theme.base.transitions.easing.easeOut)};
    }

    @keyframes slideDown {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${unsafeCSS(theme.base.spacing.lg)};
      border-bottom: 1px solid ${unsafeCSS(theme.base.palette.divider)};
    }

    .modal-title {
      font-size: ${unsafeCSS(theme.base.typography.h5.fontSize)};
      font-weight: ${unsafeCSS(theme.base.typography.fontWeightMedium)};
      color: ${unsafeCSS(theme.base.palette.text.primary)};
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: ${unsafeCSS(theme.base.palette.text.secondary)};
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${unsafeCSS(theme.base.borderRadius.sm)};
      transition: background-color ${unsafeCSS(theme.base.transitions.duration.short)}ms;
    }

    .modal-close:hover {
      background-color: ${unsafeCSS(theme.base.palette.grey[100])};
    }

    .modal-body {
      padding: ${unsafeCSS(theme.base.spacing.lg)};
    }

    .modal-footer {
      padding: ${unsafeCSS(theme.base.spacing.md)} ${unsafeCSS(theme.base.spacing.lg)};
      border-top: 1px solid ${unsafeCSS(theme.base.palette.divider)};
      display: flex;
      justify-content: flex-end;
      gap: ${unsafeCSS(theme.base.spacing.md)};
    }

    .modal-content.small {
      width: 400px;
    }

    .modal-content.medium {
      width: 600px;
    }

    .modal-content.large {
      width: 800px;
    }
  `;

  @property({ type: Boolean })
  open = false;

  @property({ type: String })
  title = '';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  closeOnOverlay = true;

  render() {
    if (!this.open) return html``;

    return html`
      <div class="modal-overlay" @click=${this._handleOverlayClick}>
        <div class="modal-content ${this.size}" @click=${(e: Event) => e.stopPropagation()}>
          ${this.title ? html`
            <div class="modal-header">
              <div class="modal-title">${this.title}</div>
              <button class="modal-close" @click=${this.close}>×</button>
            </div>
          ` : ''}
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  private _handleOverlayClick() {
    if (this.closeOnOverlay) {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('modal-close', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-modal': LitModal;
  }
}
