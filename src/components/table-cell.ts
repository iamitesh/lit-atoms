import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-table-cell')
export class LitTableCell extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
    }

    td {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 12px 16px;
      color: #333;
      border-bottom: 1px solid #eee;
    }

    td.align-left {
      text-align: left;
    }

    td.align-center {
      text-align: center;
    }

    td.align-right {
      text-align: right;
    }
  `;

  @property({ type: String })
  align: 'left' | 'center' | 'right' = 'left';

  render() {
    return html`
      <td class="align-${this.align}">
        <slot></slot>
      </td>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-table-cell': LitTableCell;
  }
}
