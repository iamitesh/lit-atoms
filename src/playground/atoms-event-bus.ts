/**
 * Atoms Event Bus
 * 
 * In-memory store for atom events with pub/sub capabilities
 */

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

  addEvent(event: AtomEventDetail): void {
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

  clear(): void {
    this.events = [];
  }

  subscribe(fn: (entry: AtomEventEntry) => void): () => void {
    this.listeners.push(fn);
    return () => {
      const idx = this.listeners.indexOf(fn);
      if (idx >= 0) this.listeners.splice(idx, 1);
    };
  }
}

export const atomsEventBus = new AtomsEventBus();
