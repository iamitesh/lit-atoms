import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-textarea')
export class LitTextarea extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .textarea-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    label {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    textarea {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
      resize: vertical;
      min-height: 80px;
    }

    textarea:focus {
      border-color: #1ea7fd;
    }

    textarea:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    .helper-text {
      font-size: 12px;
      color: #666;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: Number })
  rows = 4;

  @property({ type: String })
  helperText = '';

  render() {
    return html`
      <div class="textarea-container">
        ${this.label ? html`<label>${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <textarea
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          rows=${this.rows}
          @input=${this._handleInput}
        ></textarea>
        ${this.helperText ? html`<span class="helper-text">${this.helperText}</span>` : ''}
      </div>
    `;
  }

  private _handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(new CustomEvent('textarea-change', {
      detail: { value: textarea.value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-textarea': LitTextarea;
  }
}
