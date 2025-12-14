import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultTheme } from '../theme/index.js';

const theme = defaultTheme;

@customElement('lit-badge')
export class LitBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      font-family: ${unsafeCSS(theme.base.typography.fontFamily)};
      font-size: ${unsafeCSS(theme.base.typography.caption.fontSize)};
      font-weight: ${unsafeCSS(theme.base.typography.fontWeightMedium)};
      padding: ${unsafeCSS(theme.base.spacing.xs)} ${unsafeCSS(theme.base.spacing.sm)};
      border-radius: ${unsafeCSS(theme.base.borderRadius.full)};
      display: inline-block;
      line-height: 1;
    }

    .primary {
      background-color: ${unsafeCSS(theme.base.palette.primary.main)};
      color: ${unsafeCSS(theme.base.palette.primary.contrastText)};
    }

    .success {
      background-color: ${unsafeCSS(theme.base.palette.success.main)};
      color: ${unsafeCSS(theme.base.palette.success.contrastText)};
    }

    .warning {
      background-color: ${unsafeCSS(theme.base.palette.warning.main)};
      color: ${unsafeCSS(theme.base.palette.warning.contrastText)};
    }

    .danger {
      background-color: ${unsafeCSS(theme.base.palette.error.main)};
      color: ${unsafeCSS(theme.base.palette.error.contrastText)};
    }

    .info {
      background-color: ${unsafeCSS(theme.base.palette.info.main)};
      color: ${unsafeCSS(theme.base.palette.info.contrastText)};
    }

    .neutral {
      background-color: ${unsafeCSS(theme.base.palette.grey[500])};
      color: ${unsafeCSS(theme.base.palette.grey[50])};
    }

    .small {
      font-size: 10px;
      padding: 2px 6px;
    }

    .medium {
      font-size: 12px;
      padding: 4px 8px;
    }

    .large {
      font-size: 14px;
      padding: 6px 12px;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'primary';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  render() {
    return html`
      <span class="badge ${this.variant} ${this.size}">
        ${this.label}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-badge': LitBadge;
  }
}
