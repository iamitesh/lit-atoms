import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-spinner')
export class LitSpinner extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #1ea7fd;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .small {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }

    .medium {
      width: 40px;
      height: 40px;
      border-width: 3px;
    }

    .large {
      width: 60px;
      height: 60px;
      border-width: 4px;
    }
  `;

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  render() {
    return html`
      <div class="spinner ${this.size}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-spinner': LitSpinner;
  }
}
