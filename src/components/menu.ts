import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lit-menu')
export class LitMenu extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .menu-trigger {
      cursor: pointer;
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      z-index: 1000;
      margin-top: 4px;
      display: none;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .menu-dropdown.open {
      display: block;
    }

    .menu-dropdown.right {
      left: auto;
      right: 0;
    }

    .menu-item {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: #333;
      font-size: 14px;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }

    .menu-item:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    .menu-item:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .menu-divider {
      height: 1px;
      background-color: #eee;
      margin: 4px 0;
    }
  `;

  @property({ type: Array })
  items: Array<{ label: string; value: string; disabled?: boolean; divider?: boolean }> = [];

  @property({ type: String })
  placement: 'left' | 'right' = 'left';

  @state()
  private _isOpen = false;

  render() {
    return html`
      <div>
        <div class="menu-trigger" @click=${this._toggleMenu}>
          <slot name="trigger"></slot>
        </div>
        <div class="menu-dropdown ${this._isOpen ? 'open' : ''} ${this.placement}">
          ${this.items.map(item => 
            item.divider 
              ? html`<div class="menu-divider"></div>`
              : html`
                  <button
                    class="menu-item"
                    ?disabled=${item.disabled}
                    @click=${() => this._selectItem(item)}
                  >
                    ${item.label}
                  </button>
                `
          )}
          <slot></slot>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _toggleMenu() {
    this._isOpen = !this._isOpen;
  }

  private _selectItem(item: any) {
    if (!item.disabled) {
      this._isOpen = false;
      this.dispatchEvent(new CustomEvent('menu-select', {
        detail: { value: item.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleOutsideClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this._isOpen = false;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-menu': LitMenu;
  }
}
