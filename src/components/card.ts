import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-card')
export class LitCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: white;
    }

    .card.elevated {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      font-weight: 600;
      font-size: 18px;
    }

    .card-content {
      padding: 16px;
    }

    .card-footer {
      padding: 16px;
      border-top: 1px solid #eee;
      background-color: #f9f9f9;
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
