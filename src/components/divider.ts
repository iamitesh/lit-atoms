import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-divider')
export class LitDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .divider {
      border: none;
      border-top: 1px solid #e0e0e0;
      margin: 16px 0;
    }

    .divider.vertical {
      display: inline-block;
      height: 100%;
      border-top: none;
      border-left: 1px solid #e0e0e0;
      margin: 0 16px;
      vertical-align: middle;
    }

    .divider.thick {
      border-top-width: 2px;
    }

    .divider.vertical.thick {
      border-left-width: 2px;
    }

    .divider.dashed {
      border-top-style: dashed;
    }

    .divider.vertical.dashed {
      border-left-style: dashed;
    }
  `;

  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: String })
  variant: 'solid' | 'dashed' = 'solid';

  @property({ type: Boolean })
  thick = false;

  render() {
    const classes = [
      'divider',
      this.orientation === 'vertical' ? 'vertical' : '',
      this.variant === 'dashed' ? 'dashed' : '',
      this.thick ? 'thick' : ''
    ].filter(Boolean).join(' ');

    return html`<hr class="${classes}" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-divider': LitDivider;
  }
}
