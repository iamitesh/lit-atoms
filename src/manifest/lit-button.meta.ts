import { ComponentManifest } from './types.js';

export const litButtonMeta: ComponentManifest = {
  tag: 'lit-button',
  name: 'Button',
  category: 'form',
  description: 'A customizable button component with multiple variants and sizes',
  agentReady: true,
  
  props: [
    {
      name: 'label',
      type: 'string',
      default: 'Button',
      description: 'Button text label'
    },
    {
      name: 'variant',
      type: 'string',
      default: 'primary',
      description: 'Button style variant (primary, secondary)'
    },
    {
      name: 'size',
      type: 'string',
      default: 'medium',
      description: 'Button size (small, medium, large)'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: false,
      description: 'Whether button is disabled'
    }
  ],
  
  events: [
    {
      name: 'button-click',
      description: 'Fired when button is clicked',
      detail: '{ originalEvent: Event | null, invokedBy?: string }'
    },
    {
      name: 'atoms:event',
      description: 'Unified atom event for agent observability',
      detail: 'AtomEventDetail'
    }
  ],
  
  intents: ['submit', 'cancel', 'confirm', 'delete', 'action', 'navigate'],
  
  actions: [
    {
      id: 'click',
      label: 'Click button',
      destructive: false,
      requiresConfirm: false
    }
  ],
  
  a11y: {
    roles: ['button'],
    keyboardSupport: 'Enter and Space activate the button',
    notes: [
      'Button must have visible label text',
      'Use aria-label if label prop is not sufficient',
      'Disabled state is properly conveyed to screen readers'
    ]
  }
};
