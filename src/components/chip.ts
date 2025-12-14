import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-chip')
export class LitChip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .chip {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      font-size: ${unsafeCSS(theme.base.typography.body2.fontSize)};
      font-weight: ${unsafeCSS(theme.base.typography.fontWeightMedium)};
      padding: ${unsafeCSS(theme.base.spacing.xs)} ${unsafeCSS(theme.base.spacing.md)};
      border-radius: ${unsafeCSS(theme.base.borderRadius.full)};
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background-color: ${unsafeCSS(theme.base.palette.grey[300])};
      color: ${unsafeCSS(theme.base.palette.text.primary)};
    }

    .chip.clickable {
      cursor: pointer;
      transition: background-color ${unsafeCSS(theme.base.transitions.duration.short)}ms;
    }

    .chip.clickable:hover {
      background-color: ${unsafeCSS(theme.base.palette.grey[400])};
    }

    .chip.primary {
      background-color: ${unsafeCSS(theme.base.palette.primary.main)};
      color: ${unsafeCSS(theme.base.palette.primary.contrastText)};
    }

    .chip.success {
      background-color: ${unsafeCSS(theme.base.palette.success.main)};
      color: ${unsafeCSS(theme.base.palette.success.contrastText)};
    }

    .chip.warning {
      background-color: ${unsafeCSS(theme.base.palette.warning.main)};
      color: ${unsafeCSS(theme.base.palette.warning.contrastText)};
    }

    .chip.danger {
      background-color: ${unsafeCSS(theme.base.palette.error.main)};
      color: ${unsafeCSS(theme.base.palette.error.contrastText)};
    }

    .close-button {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      opacity: 0.7;
      transition: opacity ${unsafeCSS(theme.base.transitions.duration.short)}ms;
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
