import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-pagination')
export class LitPagination extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .pagination {
      font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      gap: 4px;
      justify-content: center;
    }

    .page-button {
      min-width: 36px;
      height: 36px;
      padding: 8px 12px;
      border: 1px solid #ddd;
      background-color: white;
      color: #333;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .page-button:hover:not(:disabled):not(.active) {
      background-color: #f5f5f5;
      border-color: #1ea7fd;
    }

    .page-button.active {
      background-color: #1ea7fd;
      color: white;
      border-color: #1ea7fd;
      font-weight: 600;
    }

    .page-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-ellipsis {
      padding: 8px;
      color: #666;
    }
  `;

  @property({ type: Number })
  currentPage = 1;

  @property({ type: Number })
  totalPages = 10;

  @property({ type: Number })
  maxVisible = 7;

  render() {
    const pages = this._getVisiblePages();

    return html`
      <nav class="pagination">
        <button
          class="page-button"
          ?disabled=${this.currentPage === 1}
          @click=${() => this._goToPage(this.currentPage - 1)}
        >
          ‹
        </button>

        ${pages.map(page => 
          page === '...' 
            ? html`<span class="page-ellipsis">...</span>`
            : html`
                <button
                  class="page-button ${page === this.currentPage ? 'active' : ''}"
                  @click=${() => this._goToPage(page as number)}
                >
                  ${page}
                </button>
              `
        )}

        <button
          class="page-button"
          ?disabled=${this.currentPage === this.totalPages}
          @click=${() => this._goToPage(this.currentPage + 1)}
        >
          ›
        </button>
      </nav>
    `;
  }

  private _getVisiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(this.maxVisible / 2);

    if (this.totalPages <= this.maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - halfVisible);
      let end = Math.min(this.totalPages, this.currentPage + halfVisible);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < this.totalPages) {
        if (end < this.totalPages - 1) pages.push('...');
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  private _goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.dispatchEvent(new CustomEvent('page-change', {
        detail: { page },
        bubbles: true,
        composed: true
      }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-pagination': LitPagination;
  }
}
