import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-badge')
export class LitBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 12px;
      display: inline-block;
      line-height: 1;
    }

    .primary {
      background-color: #1ea7fd;
      color: white;
    }

    .success {
      background-color: #4caf50;
      color: white;
    }

    .warning {
      background-color: #ff9800;
      color: white;
    }

    .danger {
      background-color: #f44336;
      color: white;
    }

    .info {
      background-color: #2196f3;
      color: white;
    }

    .neutral {
      background-color: #9e9e9e;
      color: white;
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
