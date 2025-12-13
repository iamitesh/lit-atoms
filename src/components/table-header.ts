import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('lit-table-header')
export class LitTableHeader extends LitElement {
  static styles = css`
    :host {
      display: table-header-group;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-table-header': LitTableHeader;
  }
}
