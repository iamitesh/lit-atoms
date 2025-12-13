import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-form')
export class LitForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .form {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .form-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      justify-content: flex-end;
    }

    .form.inline .form-content {
      flex-direction: row;
      align-items: center;
    }

    .form.inline .form-actions {
      margin-top: 0;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  layout: 'vertical' | 'inline' = 'vertical';

  render() {
    return html`
      <form class="form ${this.layout}" @submit=${this._handleSubmit}>
        ${this.title ? html`<div class="form-title">${this.title}</div>` : ''}
        <div class="form-content">
          <slot></slot>
        </div>
        <div class="form-actions">
          <slot name="actions"></slot>
        </div>
      </form>
    `;
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.dispatchEvent(new CustomEvent('form-submit', {
      detail: { formData },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-form': LitForm;
  }
}
