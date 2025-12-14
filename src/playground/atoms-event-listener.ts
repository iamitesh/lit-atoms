/**
 * Atoms Event Listener
 * 
 * Installs a global listener for atoms:event on the document
 */

import { atomsEventBus } from './atoms-event-bus.js';
import { AtomEventDetail } from '../agent/atom-types.js';

let installed = false;

export function installAtomsEventListener(target: Document | HTMLElement = document): void {
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
