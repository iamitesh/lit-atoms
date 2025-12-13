import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lit-accordion')
export class LitAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .accordion {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    .accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background-color: #f9f9f9;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.2s;
      user-select: none;
    }

    .accordion-header:hover {
      background-color: #f0f0f0;
    }

    .accordion-icon {
      transition: transform 0.2s;
    }

    .accordion-icon.open {
      transform: rotate(180deg);
    }

    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .accordion-content.open {
      max-height: 1000px;
      transition: max-height 0.3s ease-in;
    }

    .accordion-body {
      padding: 16px;
      border-top: 1px solid #ddd;
    }
  `;

  @property({ type: String })
  title = 'Accordion Title';

  @property({ type: Boolean })
  open = false;

  @state()
  private _isOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this._isOpen = this.open;
  }

  render() {
    return html`
      <div class="accordion">
        <div class="accordion-header" @click=${this._toggle}>
          <span>${this.title}</span>
          <span class="accordion-icon ${this._isOpen ? 'open' : ''}">▼</span>
        </div>
        <div class="accordion-content ${this._isOpen ? 'open' : ''}">
          <div class="accordion-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  private _toggle() {
    this._isOpen = !this._isOpen;
    this.dispatchEvent(new CustomEvent('accordion-toggle', {
      detail: { open: this._isOpen },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-accordion': LitAccordion;
  }
}
