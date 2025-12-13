import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-table-header-cell')
export class LitTableHeaderCell extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
    }

    th {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      background-color: #f5f5f5;
      color: #333;
      border-bottom: 2px solid #ddd;
    }

    th.sortable {
      cursor: pointer;
      user-select: none;
    }

    th.sortable:hover {
      background-color: #ebebeb;
    }

    .sort-icon {
      margin-left: 4px;
      font-size: 10px;
    }
  `;

  @property({ type: Boolean })
  sortable = false;

  @property({ type: String })
  sortDirection: 'asc' | 'desc' | '' = '';

  render() {
    return html`
      <th class="${this.sortable ? 'sortable' : ''}" @click=${this._handleClick}>
        <slot></slot>
        ${this.sortable && this.sortDirection ? html`
          <span class="sort-icon">${this.sortDirection === 'asc' ? '▲' : '▼'}</span>
        ` : ''}
      </th>
    `;
  }

  private _handleClick() {
    if (this.sortable) {
      this.dispatchEvent(new CustomEvent('header-click', {
        detail: { sortDirection: this.sortDirection },
        bubbles: true,
        composed: true
      }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-table-header-cell': LitTableHeaderCell;
  }
}
