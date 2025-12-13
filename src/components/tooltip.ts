import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-tooltip')
export class LitTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip-trigger {
      cursor: help;
    }

    .tooltip-content {
      position: absolute;
      background-color: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      pointer-events: none;
    }

    .tooltip-content.visible {
      opacity: 1;
      visibility: visible;
    }

    .tooltip-content.top {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-content.bottom {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip-content.left {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip-content.right {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }
  `;

  @property({ type: String })
  text = '';

  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: Boolean })
  visible = false;

  render() {
    return html`
      <div 
        class="tooltip-trigger" 
        @mouseenter=${this._showTooltip}
        @mouseleave=${this._hideTooltip}
      >
        <slot></slot>
        <div class="tooltip-content ${this.position} ${this.visible ? 'visible' : ''}">
          ${this.text}
        </div>
      </div>
    `;
  }

  private _showTooltip() {
    this.visible = true;
  }

  private _hideTooltip() {
    this.visible = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-tooltip': LitTooltip;
  }
}
