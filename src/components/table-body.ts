import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('lit-table-body')
export class LitTableBody extends LitElement {
  static styles = css`
    :host {
      display: table-row-group;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-table-body': LitTableBody;
  }
}
