import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-table')
export class LitTable extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .table-container {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
    }

    table.striped tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    table.bordered {
      border: 1px solid #ddd;
    }

    table.bordered th,
    table.bordered td {
      border: 1px solid #ddd;
    }

    table.hoverable tbody tr:hover {
      background-color: #f5f5f5;
    }
  `;

  @property({ type: Boolean })
  striped = false;

  @property({ type: Boolean })
  bordered = false;

  @property({ type: Boolean })
  hoverable = false;

  render() {
    const classes = [
      this.striped ? 'striped' : '',
      this.bordered ? 'bordered' : '',
      this.hoverable ? 'hoverable' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="table-container">
        <table class="${classes}">
          <slot></slot>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-table': LitTable;
  }
}
