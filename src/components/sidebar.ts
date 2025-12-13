import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-sidebar')
export class LitSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .sidebar {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f9f9f9;
      border-right: 1px solid #eee;
      height: 100%;
      overflow-y: auto;
      transition: width 0.3s ease;
    }

    .sidebar.left {
      border-right: 1px solid #eee;
    }

    .sidebar.right {
      border-left: 1px solid #eee;
      border-right: none;
    }

    .sidebar.collapsed {
      width: 60px;
    }

    .sidebar-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      font-weight: 600;
      font-size: 18px;
    }

    .sidebar-content {
      padding: 16px;
    }

    .sidebar.small {
      width: 200px;
    }

    .sidebar.medium {
      width: 280px;
    }

    .sidebar.large {
      width: 360px;
    }
  `;

  @property({ type: String })
  position: 'left' | 'right' = 'left';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  collapsed = false;

  @property({ type: String })
  header = '';

  render() {
    return html`
      <aside class="sidebar ${this.position} ${this.size} ${this.collapsed ? 'collapsed' : ''}">
        ${this.header && !this.collapsed ? html`
          <div class="sidebar-header">${this.header}</div>
        ` : ''}
        <div class="sidebar-content">
          <slot></slot>
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-sidebar': LitSidebar;
  }
}
