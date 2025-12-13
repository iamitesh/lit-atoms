import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lit-tabs')
export class LitTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tabs {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .tab-list {
      display: flex;
      border-bottom: 2px solid #eee;
      gap: 4px;
    }

    .tab-button {
      padding: 12px 24px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #666;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      transition: all 0.2s;
      position: relative;
    }

    .tab-button:hover {
      color: #1ea7fd;
    }

    .tab-button.active {
      color: #1ea7fd;
      border-bottom-color: #1ea7fd;
    }

    .tab-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tab-content {
      padding: 20px 0;
    }
  `;

  @property({ type: Array })
  tabs: Array<{ label: string; value: string; disabled?: boolean }> = [];

  @property({ type: String })
  activeTab = '';

  @state()
  private _currentTab = '';

  connectedCallback() {
    super.connectedCallback();
    this._currentTab = this.activeTab || (this.tabs[0]?.value || '');
  }

  render() {
    return html`
      <div class="tabs">
        <div class="tab-list">
          ${this.tabs.map(tab => html`
            <button
              class="tab-button ${this._currentTab === tab.value ? 'active' : ''}"
              ?disabled=${tab.disabled}
              @click=${() => this._selectTab(tab.value)}
            >
              ${tab.label}
            </button>
          `)}
        </div>
        <div class="tab-content">
          <slot name="${this._currentTab}"></slot>
        </div>
      </div>
    `;
  }

  private _selectTab(value: string) {
    this._currentTab = value;
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-tabs': LitTabs;
  }
}
