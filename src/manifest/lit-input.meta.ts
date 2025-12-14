import { ComponentManifest } from './types.js';

export const litInputMeta: ComponentManifest = {
  tag: 'lit-input-field',
  name: 'Input Field',
  category: 'form',
  description: 'Text input field with validation and helper text',
  agentReady: true,
  
  props: [
    {
      name: 'label',
      type: 'string',
      default: '',
      description: 'Input label text'
    },
    {
      name: 'value',
      type: 'string',
      default: '',
      description: 'Current input value'
    },
    {
      name: 'type',
      type: 'string',
      default: 'text',
      description: 'Input type (text, email, password, number)'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: '',
      description: 'Placeholder text shown when input is empty'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: false,
      description: 'Whether input is disabled'
    },
    {
      name: 'required',
      type: 'boolean',
      default: false,
      description: 'Whether input is required'
    },
    {
      name: 'helperText',
      type: 'string',
      default: '',
      description: 'Helper text displayed below input'
    },
    {
      name: 'errorText',
      type: 'string',
      default: '',
      description: 'Error message displayed below input (takes precedence over helper text)'
    }
  ],
  
  events: [
    {
      name: 'input-change',
      description: 'Fired when input value changes',
      detail: '{ value: string }'
    },
    {
      name: 'atoms:event',
      description: 'Unified atom event for agent observability',
      detail: 'AtomEventDetail'
    }
  ],
  
  intents: ['search', 'filter', 'data-entry', 'authentication', 'form-input'],
  
  actions: [
    {
      id: 'setValue',
      label: 'Set input value',
      params: [
        {
          name: 'value',
          type: 'string',
          required: true
        }
      ]
    },
    {
      id: 'clear',
      label: 'Clear input value'
    },
    {
      id: 'focus',
      label: 'Focus the input'
    }
  ],
  
  a11y: {
    roles: ['textbox'],
    keyboardSupport: 'Standard text input keyboard navigation',
    notes: [
      'Label is properly associated with input element',
      'Error messages are linked via aria-describedby when present',
      'Required state is indicated both visually and to screen readers',
      'Use data-sensitive="true" for password/credit card fields to redact values in logs'
    ]
  }
};
