import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-card')
export class LitCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      border-radius: ${unsafeCSS(theme.base.borderRadius.md)};
      box-shadow: ${unsafeCSS(theme.base.shadows.sm)};
      overflow: hidden;
      background-color: ${unsafeCSS(theme.base.palette.background.default)};
    }

    .card.elevated {
      box-shadow: ${unsafeCSS(theme.base.shadows.md)};
    }

    .card-header {
      padding: ${unsafeCSS(theme.base.spacing.md)};
      border-bottom: 1px solid ${unsafeCSS(theme.base.palette.divider)};
      font-weight: ${unsafeCSS(theme.base.typography.fontWeightMedium)};
      font-size: ${unsafeCSS(theme.base.typography.h6.fontSize)};
    }

    .card-content {
      padding: ${unsafeCSS(theme.base.spacing.md)};
    }

    .card-footer {
      padding: ${unsafeCSS(theme.base.spacing.md)};
      border-top: 1px solid ${unsafeCSS(theme.base.palette.divider)};
      background-color: ${unsafeCSS(theme.base.palette.background.paper)};
    }
  `;

  @property({ type: String })
  header = '';

  @property({ type: String })
  footer = '';

  @property({ type: Boolean })
  elevated = false;

  render() {
    return html`
      <div class="card ${this.elevated ? 'elevated' : ''}">
        ${this.header ? html`<div class="card-header">${this.header}</div>` : ''}
        <div class="card-content">
          <slot></slot>
        </div>
        ${this.footer ? html`<div class="card-footer">${this.footer}</div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-card': LitCard;
  }
}
