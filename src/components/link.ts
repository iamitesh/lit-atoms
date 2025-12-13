import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-link')
export class LitLink extends LitElement {
  static styles = css`
    :host {
      display: inline;
    }

    a {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1ea7fd;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    a:hover {
      text-decoration: underline;
      color: #0d8ae0;
    }

    a.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    a.underline {
      text-decoration: underline;
    }

    a.bold {
      font-weight: 600;
    }

    a.external::after {
      content: ' ↗';
      font-size: 0.8em;
    }
  `;

  @property({ type: String })
  href = '#';

  @property({ type: String })
  target = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  underline = false;

  @property({ type: Boolean })
  bold = false;

  @property({ type: Boolean })
  external = false;

  render() {
    const classes = [
      this.disabled ? 'disabled' : '',
      this.underline ? 'underline' : '',
      this.bold ? 'bold' : '',
      this.external ? 'external' : ''
    ].filter(Boolean).join(' ');

    return html`
      <a
        href=${this.href}
        target=${this.target || (this.external ? '_blank' : '')}
        rel=${this.external ? 'noopener noreferrer' : ''}
        class="${classes}"
        @click=${this._handleClick}
      >
        <slot></slot>
      </a>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent('link-click', {
      detail: { href: this.href },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-link': LitLink;
  }
}
