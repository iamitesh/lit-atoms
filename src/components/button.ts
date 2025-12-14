import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-button')
export class LitButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      font-weight: ${unsafeCSS(theme.base.typography.fontWeightBold)};
      border: 0;
      border-radius: ${unsafeCSS(theme.base.borderRadius.full)};
      cursor: pointer;
      display: inline-block;
      line-height: 1;
      transition: all ${unsafeCSS(theme.base.transitions.duration.short)}ms ${unsafeCSS(theme.base.transitions.easing.easeInOut)};
    }

    button:hover {
      opacity: 0.8;
    }

    button:active {
      transform: scale(0.98);
    }

    .primary {
      color: ${unsafeCSS(theme.base.palette.primary.contrastText)};
      background-color: ${unsafeCSS(theme.base.palette.primary.main)};
    }

    .secondary {
      color: ${unsafeCSS(theme.base.palette.text.primary)};
      background-color: transparent;
      box-shadow: ${unsafeCSS(theme.base.palette.grey[400])} 0px 0px 0px 1px inset;
    }

    .small {
      font-size: 12px;
      padding: 10px 16px;
    }

    .medium {
      font-size: 14px;
      padding: 11px 20px;
    }

    .large {
      font-size: 16px;
      padding: 12px 24px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  @property({ type: String })
  label = 'Button';

  @property({ type: String })
  variant: 'primary' | 'secondary' = 'primary';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  disabled = false;

  render() {
    return html`
      <button
        class="${this.variant} ${this.size}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${this.label}
      </button>
    `;
  }

  private _handleClick(e: Event) {
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
}
