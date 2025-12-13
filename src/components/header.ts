import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-header')
export class LitHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .header {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
    }

    .header.sticky {
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .logo {
      font-size: 24px;
      font-weight: 700;
      color: #1ea7fd;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `;

  @property({ type: String })
  logo = '';

  @property({ type: String })
  title = '';

  @property({ type: Boolean })
  sticky = false;

  render() {
    return html`
      <header class="header ${this.sticky ? 'sticky' : ''}">
        <div class="header-left">
          ${this.logo ? html`<div class="logo">${this.logo}</div>` : ''}
          ${this.title ? html`<div class="title">${this.title}</div>` : ''}
          <slot name="left"></slot>
        </div>
        <div class="header-right">
          <slot name="right"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-header': LitHeader;
  }
}
