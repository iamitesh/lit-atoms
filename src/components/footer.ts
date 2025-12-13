import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-footer')
export class LitFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .footer {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 24px;
      background-color: #f9f9f9;
      border-top: 1px solid #eee;
      text-align: center;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .copyright {
      font-size: 14px;
      color: #666;
    }
  `;

  @property({ type: String })
  copyright = '';

  render() {
    return html`
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-links">
            <slot name="links"></slot>
          </div>
          <slot></slot>
          ${this.copyright ? html`<div class="copyright">${this.copyright}</div>` : ''}
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-footer': LitFooter;
  }
}
