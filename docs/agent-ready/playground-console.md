# Playground Console Documentation

## Overview

The **Playground Console** is an enhanced logging panel in the `lit-atoms` playground that captures and displays all `atoms:event` emissions from agent-ready components. It provides visibility into component interactions, making it easier for developers and AI assistants to understand what's happening in the application.

## Purpose

The console panel serves multiple purposes:

1. **Development & Debugging** - See real-time component events during development
2. **AI Context** - Provide event history for AI assistants to understand user intent
3. **Audit Trail** - Track user and agent actions for debugging
4. **Learning** - Understand how components emit events and respond to interactions

## Architecture

The playground console consists of three main parts:

### 1. Event Bus (`atoms-event-bus.ts`)

A simple in-memory store that:
- Captures `atoms:event` events from the document
- Maintains a circular buffer of recent events (last 200)
- Provides access to event history

### 2. Event Listener (`atoms-event-listener.ts`)

Installs a global document listener that:
- Listens for `atoms:event` on document
- Adds events to the event bus
- Can be installed once per application

### 3. Console Component (`lit-atoms-console.ts`)

A custom element (`<lit-atoms-console>`) that:
- Displays events in a scrollable panel
- Shows: sequence number, timestamp, event type, component, actor, payload
- Provides Clear and Auto-scroll controls
- Updates in real-time as events arrive

## Implementation

### atoms-event-bus.ts

```typescript
import { AtomEventDetail } from '../agent/atom-types.js';

export interface AtomEventEntry {
  seq: number;
  timestamp: number;
  event: AtomEventDetail;
}

class AtomsEventBus {
  private events: AtomEventEntry[] = [];
  private maxEvents = 200;
  private seq = 0;
  private listeners: Array<(entry: AtomEventEntry) => void> = [];

  addEvent(event: AtomEventDetail) {
    this.seq++;
    const entry: AtomEventEntry = {
      seq: this.seq,
      timestamp: event.timestamp,
      event
    };
    
    this.events.push(entry);
    
    // Keep only last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
    
    // Notify listeners
    this.listeners.forEach(fn => fn(entry));
  }

  getEvents(): AtomEventEntry[] {
    return [...this.events];
  }

  clear() {
    this.events = [];
  }

  subscribe(fn: (entry: AtomEventEntry) => void) {
    this.listeners.push(fn);
    return () => {
      const idx = this.listeners.indexOf(fn);
      if (idx >= 0) this.listeners.splice(idx, 1);
    };
  }
}

export const atomsEventBus = new AtomsEventBus();
```

### atoms-event-listener.ts

```typescript
import { atomsEventBus } from './atoms-event-bus.js';
import { AtomEventDetail } from '../agent/atom-types.js';

let installed = false;

export function installAtomsEventListener(target: Document | HTMLElement = document) {
  if (installed) {
    console.warn('AtomsEventListener already installed');
    return;
  }

  target.addEventListener('atoms:event', (e: Event) => {
    const customEvent = e as CustomEvent<AtomEventDetail>;
    atomsEventBus.addEvent(customEvent.detail);
  });

  installed = true;
  console.log('✅ AtomsEventListener installed');
}
```

### lit-atoms-console.ts

```typescript
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
    
    return html`
      <div class="event-entry">
        <div class="event-header">
          <span class="event-seq">#${entry.seq}</span>
          <span class="event-type ${typeClass}">${event.type}</span>
          <span class="event-component">${event.component}${event.id ? `#${event.id}` : ''}</span>
          <span class="event-actor">[${event.actor}]</span>
        </div>
        ${event.payload
          ? html`<div class="event-payload">${JSON.stringify(event.payload, null, 2)}</div>`
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
```

## Integration into Playground

### playground/app.js

Add to the top of the file:

```javascript
// Import atoms console components
import '../src/playground/atoms-event-listener.ts';
import '../src/playground/lit-atoms-console.ts';
import { installAtomsEventListener } from '../src/playground/atoms-event-listener.ts';

// Install listener once
installAtomsEventListener(document);
```

### playground/index.html

Add a console panel container. Modify the console panel section:

```html
<div class="console-panel">
  <div class="console-header">
    <span>Atoms Console</span>
  </div>
  <div class="console-content">
    <!-- Mount atoms console here -->
    <lit-atoms-console></lit-atoms-console>
  </div>
</div>
```

## Usage

### For Developers

1. Open the playground: `npm run playground`
2. Interact with components (click buttons, type in inputs)
3. Watch the Atoms Console panel update in real-time
4. Use Clear button to reset
5. Toggle Auto-scroll for manual inspection

### For AI Assistants

An AI assistant can:

1. **Read event history** from `atomsEventBus.getEvents()`
2. **Subscribe to new events** via `atomsEventBus.subscribe(fn)`
3. **Analyze patterns** to understand user behavior
4. **Provide context-aware suggestions** based on recent events

Example AI integration:

```typescript
import { atomsEventBus } from './atoms-event-bus.js';

// Get recent events
const recentEvents = atomsEventBus.getEvents().slice(-10);

// Analyze for patterns
const hasErrors = recentEvents.some(e => e.event.type === 'atoms.error');
const hasA11yIssues = recentEvents.some(e => e.event.type === 'atoms.a11y');

if (hasErrors) {
  // AI: "I noticed validation errors. Let me help fix them..."
}

if (hasA11yIssues) {
  // AI: "There are accessibility issues. I can suggest fixes..."
}

// Subscribe to future events
atomsEventBus.subscribe((entry) => {
  if (entry.event.type === 'atoms.error') {
    // AI: Proactively offer help
  }
});
```

## Event Display Format

Each event in the console shows:

- **#seq** - Sequential event number (monotonically increasing)
- **Type** - Color-coded event type (usage, change, action, error, a11y)
- **Component** - Tag name and ID (if present)
- **Actor** - `[user]` or `[agent]`
- **Payload** - JSON representation of event data

## Benefits

1. **Transparency** - See all component interactions
2. **Debugging** - Track down issues quickly
3. **Learning** - Understand how components work
4. **AI Context** - Provide rich context for assistants
5. **Auditing** - Record of all actions for compliance

## Future Enhancements (Out of Scope for v0.1)

- Filter events by type, component, or actor
- Export event log to JSON/CSV
- Search/highlight events
- Collapse/expand event payloads
- Time-based grouping
- Performance metrics
