import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-table-row')
export class LitTableRow extends LitElement {
  static styles = css`
    :host {
      display: table-row;
    }

    tr {
      transition: background-color 0.2s;
    }

    tr.selected {
      background-color: #e3f2fd;
    }
  `;

  @property({ type: Boolean })
  selected = false;

  render() {
    return html`
      <tr class="${this.selected ? 'selected' : ''}" @click=${this._handleClick}>
        <slot></slot>
      </tr>
    `;
  }

  private _handleClick(e: Event) {
    this.dispatchEvent(new CustomEvent('row-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-table-row': LitTableRow;
  }
}
