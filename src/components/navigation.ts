import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-navigation')
export class LitNavigation extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .nav {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .nav.horizontal {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .nav.vertical {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-item {
      padding: 10px 16px;
      color: #333;
      text-decoration: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: block;
    }

    .nav-item:hover {
      background-color: #f5f5f5;
    }

    .nav-item.active {
      background-color: #1ea7fd;
      color: white;
    }
  `;

  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Array })
  items: Array<{ label: string; value: string; active?: boolean }> = [];

  render() {
    return html`
      <nav class="nav ${this.orientation}">
        ${this.items.map(item => html`
          <a
            class="nav-item ${item.active ? 'active' : ''}"
            href="#"
            @click=${(e: Event) => this._handleClick(e, item.value)}
          >
            ${item.label}
          </a>
        `)}
        <slot></slot>
      </nav>
    `;
  }

  private _handleClick(e: Event, value: string) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-click', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-navigation': LitNavigation;
  }
}
