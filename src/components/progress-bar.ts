import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-progress-bar')
export class LitProgressBar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .progress-container {
      width: 100%;
      background-color: #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background-color: #1ea7fd;
      transition: width 0.3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 600;
    }

    .small {
      height: 8px;
    }

    .medium {
      height: 16px;
    }

    .large {
      height: 24px;
    }

    .success {
      background-color: #4caf50;
    }

    .warning {
      background-color: #ff9800;
    }

    .danger {
      background-color: #f44336;
    }
  `;

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  variant: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  @property({ type: Boolean })
  showLabel = false;

  render() {
    const percentage = Math.min(100, Math.max(0, this.value));
    const variantClass = this.variant === 'primary' ? '' : this.variant;

    return html`
      <div class="progress-container ${this.size}">
        <div 
          class="progress-bar ${variantClass}" 
          style="width: ${percentage}%"
        >
          ${this.showLabel && this.size !== 'small' ? `${percentage}%` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-progress-bar': LitProgressBar;
  }
}
