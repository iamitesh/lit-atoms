/**
 * Lit Atoms Console Component
 * 
 * Displays atoms:event logs in a console panel
 */

import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { atomsEventBus, AtomEventEntry } from './atoms-event-bus.js';

@customElement('lit-atoms-console')
export class LitAtomsConsole extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
      background: #1e1e1e;
      color: #d4d4d4;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 13px;
    }

    .console-header {
      background: #2d2d2d;
      padding: 8px 12px;
      border-bottom: 1px solid #3e3e3e;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .console-title {
      font-weight: 600;
      color: #fff;
      font-size: 14px;
    }

    .console-actions {
      display: flex;
      gap: 8px;
    }

    button {
      background: #3e3e3e;
      color: #fff;
      border: none;
      padding: 4px 12px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-family: inherit;
    }

    button:hover {
      background: #4e4e4e;
    }

    .console-content {
      height: calc(100% - 40px);
      overflow-y: auto;
      padding: 8px;
    }

    .event-entry {
      padding: 6px 8px;
      border-bottom: 1px solid #2d2d2d;
      font-size: 12px;
      line-height: 1.4;
    }

    .event-header {
      display: flex;
      gap: 12px;
      margin-bottom: 4px;
    }

    .event-seq {
      color: #888;
      min-width: 40px;
    }

    .event-type {
      font-weight: 600;
      min-width: 120px;
    }

    .event-type.usage { color: #4ec9b0; }
    .event-type.change { color: #dcdcaa; }
    .event-type.action { color: #9cdcfe; }
    .event-type.error { color: #f48771; }
    .event-type.a11y { color: #ce9178; }

    .event-component {
      color: #4fc1ff;
    }

    .event-actor {
      color: #c586c0;
      font-style: italic;
    }

    .event-payload {
      color: #b5cea8;
      margin-left: 52px;
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 11px;
    }

    .empty-state {
      padding: 40px;
      text-align: center;
      color: #888;
    }
  `;

  @state()
  private events: AtomEventEntry[] = [];

  @state()
  private autoScroll = true;

  private unsubscribe?: () => void;

  connectedCallback() {
    super.connectedCallback();
    
    // Load existing events
    this.events = atomsEventBus.getEvents();
    
    // Subscribe to new events
    this.unsubscribe = atomsEventBus.subscribe((entry) => {
      this.events = [...this.events, entry];
      
      if (this.autoScroll) {
        this.scrollToBottom();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  private scrollToBottom() {
    this.updateComplete.then(() => {
      const content = this.shadowRoot?.querySelector('.console-content');
      if (content) {
        content.scrollTop = content.scrollHeight;
      }
    });
  }

  private handleClear() {
    atomsEventBus.clear();
    this.events = [];
  }

  private toggleAutoScroll() {
    this.autoScroll = !this.autoScroll;
    if (this.autoScroll) {
      this.scrollToBottom();
    }
  }

  private getEventTypeClass(type: string): string {
    return type.replace('atoms.', '');
  }

  render() {
    return html`
      <div class="console-header">
        <div class="console-title">⚛️ Atoms Events</div>
        <div class="console-actions">
          <button @click=${this.toggleAutoScroll}>
            ${this.autoScroll ? '📌 Auto-scroll ON' : '📍 Auto-scroll OFF'}
          </button>
          <button @click=${this.handleClear}>🗑️ Clear</button>
        </div>
      </div>
      
      <div class="console-content">
        ${this.events.length === 0
          ? html`<div class="empty-state">No events yet. Interact with components to see events here.</div>`
          : this.events.map(entry => this.renderEvent(entry))
        }
      </div>
    `;
  }

  private renderEvent(entry: AtomEventEntry) {
    const { event } = entry;
    const typeClass = this.getEventTypeClass(event.type);
    const componentText = `${event.component}${event.id ? `#${event.id}` : ''}`;
    const payloadJson = event.payload ? JSON.stringify(event.payload, null, 2) : '';
    
    return html`
      <div class="event-entry">
        <div class="event-header">
          <span class="event-seq">#${entry.seq}</span>
          <span class="event-type ${typeClass}">${event.type}</span>
          <span class="event-component">${componentText}</span>
          <span class="event-actor">[${event.actor}]</span>
        </div>
        ${payloadJson
          ? html`<div class="event-payload">${payloadJson}</div>`
          : ''
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-atoms-console': LitAtomsConsole;
  }
}
