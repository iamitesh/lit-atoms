import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-avatar')
export class LitAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .avatar {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #1ea7fd;
      color: white;
      font-weight: 600;
      overflow: hidden;
      position: relative;
    }

    .avatar.small {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }

    .avatar.medium {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }

    .avatar.large {
      width: 64px;
      height: 64px;
      font-size: 24px;
    }

    .avatar.square {
      border-radius: 8px;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      border: 2px solid white;
    }

    .avatar-status.online {
      background-color: #4caf50;
    }

    .avatar-status.offline {
      background-color: #9e9e9e;
    }

    .avatar-status.busy {
      background-color: #f44336;
    }
  `;

  @property({ type: String })
  src = '';

  @property({ type: String })
  alt = '';

  @property({ type: String })
  initials = '';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  shape: 'circle' | 'square' = 'circle';

  @property({ type: String })
  status: 'online' | 'offline' | 'busy' | '' = '';

  render() {
    return html`
      <div class="avatar ${this.size} ${this.shape}">
        ${this.src 
          ? html`<img src=${this.src} alt=${this.alt || this.initials} />`
          : html`<span>${this.initials}</span>`
        }
        ${this.status ? html`<span class="avatar-status ${this.status}"></span>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-avatar': LitAvatar;
  }
}
