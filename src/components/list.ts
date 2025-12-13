import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-list')
export class LitList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .list {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      list-style-position: inside;
    }

    .list.unordered {
      list-style-type: disc;
    }

    .list.ordered {
      list-style-type: decimal;
    }

    .list.none {
      list-style-type: none;
      padding: 0;
    }

    .list-item {
      padding: 8px 12px;
      color: #333;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .list-item.clickable {
      cursor: pointer;
    }

    .list-item.clickable:hover {
      background-color: #f5f5f5;
    }

    .list-item.active {
      background-color: #e3f2fd;
      color: #1ea7fd;
    }

    .list.divider .list-item:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  `;

  @property({ type: String })
  type: 'ordered' | 'unordered' | 'none' = 'unordered';

  @property({ type: Array })
  items: Array<{ label: string; value?: string; active?: boolean; clickable?: boolean }> = [];

  @property({ type: Boolean })
  divider = false;

  render() {
    const ListTag = this.type === 'ordered' ? 'ol' : 'ul';

    return html`
      <${ListTag} class="list ${this.type} ${this.divider ? 'divider' : ''}">
        ${this.items.map(item => html`
          <li
            class="list-item ${item.active ? 'active' : ''} ${item.clickable ? 'clickable' : ''}"
            @click=${() => this._handleClick(item)}
          >
            ${item.label}
          </li>
        `)}
        <slot></slot>
      </${ListTag}>
    `;
  }

  private _handleClick(item: any) {
    if (item.clickable) {
      this.dispatchEvent(new CustomEvent('list-item-click', {
        detail: { value: item.value, label: item.label },
        bubbles: true,
        composed: true
      }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-list': LitList;
  }
}
