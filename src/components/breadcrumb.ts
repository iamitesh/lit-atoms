import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-breadcrumb')
export class LitBreadcrumb extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .breadcrumb {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      text-decoration: none;
      font-size: 14px;
    }

    .breadcrumb-item:hover {
      color: #1ea7fd;
    }

    .breadcrumb-item.active {
      color: #333;
      font-weight: 600;
      pointer-events: none;
    }

    .breadcrumb-separator {
      color: #999;
      user-select: none;
    }
  `;

  @property({ type: Array })
  items: Array<{ label: string; href?: string; active?: boolean }> = [];

  @property({ type: String })
  separator = '/';

  render() {
    return html`
      <nav class="breadcrumb">
        ${this.items.map((item, index) => html`
          ${index > 0 ? html`<span class="breadcrumb-separator">${this.separator}</span>` : ''}
          <a
            class="breadcrumb-item ${item.active ? 'active' : ''}"
            href=${item.href || '#'}
            @click=${(e: Event) => this._handleClick(e, item, index)}
          >
            ${item.label}
          </a>
        `)}
        <slot></slot>
      </nav>
    `;
  }

  private _handleClick(e: Event, item: any, index: number) {
    if (!item.href || item.href === '#') {
      e.preventDefault();
    }
    this.dispatchEvent(new CustomEvent('breadcrumb-click', {
      detail: { item, index },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-breadcrumb': LitBreadcrumb;
  }
}
