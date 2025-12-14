# Manifest Documentation

## Purpose

The `lit-atoms.manifest.json` provides a machine-readable catalog of all agent-ready components in the library. AI assistants and automation tools can read this manifest to:

1. Discover available components and their capabilities
2. Understand what actions each component supports
3. Learn about component properties, slots, and events
4. Generate appropriate code or interactions

## Manifest Schema

### Top-Level Structure

```json
{
  "version": "0.1",
  "generatedAt": "2024-01-15T10:30:00.000Z",
  "components": [
    // Array of component descriptors
  ]
}
```

### Component Descriptor

Each component in the manifest includes:

```typescript
interface ComponentManifest {
  tag: string;                    // Custom element tag name
  name: string;                   // Human-readable name
  category: string;               // Component category
  description?: string;           // Optional description
  agentReady: boolean;           // Whether component implements AtomAgentReady
  
  props?: PropDescriptor[];       // Component properties
  slots?: SlotDescriptor[];       // Available slots
  events?: EventDescriptor[];     // Emitted events
  
  intents?: string[];            // Supported data-intent values
  actions?: ActionDescriptor[];   // Available actions via invokeAction()
  
  a11y?: {                       // Accessibility notes
    roles?: string[];
    keyboardSupport?: string;
    notes?: string[];
  };
}
```

### Property Descriptor

```typescript
interface PropDescriptor {
  name: string;
  type: string;           // 'string' | 'number' | 'boolean' | etc.
  default?: any;
  required?: boolean;
  description?: string;
}
```

### Slot Descriptor

```typescript
interface SlotDescriptor {
  name: string;           // Slot name (empty string for default)
  description?: string;
}
```

### Event Descriptor

```typescript
interface EventDescriptor {
  name: string;
  description?: string;
  detail?: string;        // Type or description of event.detail
}
```

### Action Descriptor

```typescript
interface ActionDescriptor {
  id: string;
  label: string;
  destructive?: boolean;
  requiresConfirm?: boolean;
  params?: {
    name: string;
    type: string;
    required?: boolean;
  }[];
}
```

## Example Manifest

```json
{
  "version": "0.1",
  "generatedAt": "2024-01-15T10:30:00.000Z",
  "components": [
    {
      "tag": "lit-button",
      "name": "Button",
      "category": "form",
      "description": "A customizable button component with multiple variants and sizes",
      "agentReady": true,
      "props": [
        {
          "name": "label",
          "type": "string",
          "default": "Button",
          "description": "Button text label"
        },
        {
          "name": "variant",
          "type": "string",
          "default": "primary",
          "description": "Button style variant (primary, secondary)"
        },
        {
          "name": "size",
          "type": "string",
          "default": "medium",
          "description": "Button size (small, medium, large)"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "description": "Whether button is disabled"
        }
      ],
      "events": [
        {
          "name": "button-click",
          "description": "Fired when button is clicked",
          "detail": "{ originalEvent: Event }"
        },
        {
          "name": "atoms:event",
          "description": "Unified atom event",
          "detail": "AtomEventDetail"
        }
      ],
      "intents": ["submit", "cancel", "confirm", "delete", "action"],
      "actions": [
        {
          "id": "click",
          "label": "Click button",
          "destructive": false,
          "requiresConfirm": false
        }
      ],
      "a11y": {
        "roles": ["button"],
        "keyboardSupport": "Enter and Space activate the button",
        "notes": ["Ensure button has visible label or aria-label"]
      }
    },
    {
      "tag": "lit-input-field",
      "name": "Input Field",
      "category": "form",
      "description": "Text input field with validation and helper text",
      "agentReady": true,
      "props": [
        {
          "name": "label",
          "type": "string",
          "default": "",
          "description": "Input label"
        },
        {
          "name": "value",
          "type": "string",
          "default": "",
          "description": "Input value"
        },
        {
          "name": "type",
          "type": "string",
          "default": "text",
          "description": "Input type (text, email, password, number)"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "",
          "description": "Placeholder text"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "description": "Whether input is disabled"
        },
        {
          "name": "required",
          "type": "boolean",
          "default": false,
          "description": "Whether input is required"
        },
        {
          "name": "errorText",
          "type": "string",
          "default": "",
          "description": "Error message to display"
        },
        {
          "name": "helperText",
          "type": "string",
          "default": "",
          "description": "Helper text to display"
        }
      ],
      "events": [
        {
          "name": "input-change",
          "description": "Fired when input value changes",
          "detail": "{ value: string }"
        },
        {
          "name": "atoms:event",
          "description": "Unified atom event",
          "detail": "AtomEventDetail"
        }
      ],
      "intents": ["search", "filter", "data-entry", "authentication"],
      "actions": [
        {
          "id": "setValue",
          "label": "Set input value",
          "params": [
            {
              "name": "value",
              "type": "string",
              "required": true
            }
          ]
        },
        {
          "id": "clear",
          "label": "Clear input value"
        },
        {
          "id": "focus",
          "label": "Focus the input"
        }
      ],
      "a11y": {
        "roles": ["textbox"],
        "keyboardSupport": "Standard text input keyboard navigation",
        "notes": [
          "Label is associated with input",
          "Error messages linked via aria-describedby when present"
        ]
      }
    }
  ]
}
```

## Creating Meta Files

For each agent-ready component, create a corresponding `*.meta.ts` file in `src/manifest/`:

### File: `src/manifest/lit-button.meta.ts`

```typescript
import { ComponentManifest } from './types';

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
      detail: '{ originalEvent: Event }'
    },
    {
      name: 'atoms:event',
      description: 'Unified atom event',
      detail: 'AtomEventDetail'
    }
  ],
  
  intents: ['submit', 'cancel', 'confirm', 'delete', 'action'],
  
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
    notes: ['Ensure button has visible label or aria-label']
  }
};
```

### File: `src/manifest/index.ts`

```typescript
import { litButtonMeta } from './lit-button.meta';
import { litInputMeta } from './lit-input.meta';

export const componentManifests = [
  litButtonMeta,
  litInputMeta
];
```

## Generating the Manifest

### Script Location

`scripts/generate-manifest.ts` (or `.mjs`)

### Running the Generator

```bash
npm run manifest
# or
pnpm manifest
```

This will:
1. Import all component meta files
2. Sort components by tag name
3. Add version and timestamp
4. Write to `dist/lit-atoms.manifest.json`

### Script Example

```typescript
import { writeFileSync, mkdirSync } from 'fs';
import { componentManifests } from '../src/manifest/index.js';

const manifest = {
  version: '0.1',
  generatedAt: new Date().toISOString(),
  components: componentManifests.sort((a, b) => a.tag.localeCompare(b.tag))
};

// Ensure dist directory exists
mkdirSync('dist', { recursive: true });

// Write manifest
writeFileSync(
  'dist/lit-atoms.manifest.json',
  JSON.stringify(manifest, null, 2),
  'utf-8'
);

console.log('✅ Manifest generated: dist/lit-atoms.manifest.json');
console.log(`   Components: ${manifest.components.length}`);
```

## Adding New Components

To add a new agent-ready component to the manifest:

1. Create `src/manifest/your-component.meta.ts`
2. Export the manifest descriptor
3. Import and add to `src/manifest/index.ts`
4. Run `npm run manifest`

## Using the Manifest

### In JavaScript/TypeScript

```typescript
import manifest from './dist/lit-atoms.manifest.json';

// Find a component
const button = manifest.components.find(c => c.tag === 'lit-button');
console.log(button.actions); // Available actions

// List all form components
const formComponents = manifest.components.filter(c => c.category === 'form');
```

### In AI Assistant

```typescript
// AI assistant loads manifest
const manifest = await fetch('/dist/lit-atoms.manifest.json').then(r => r.json());

// Discover what actions a button supports
const button = document.querySelector('lit-button');
const buttonMeta = manifest.components.find(c => c.tag === 'lit-button');

console.log('Available actions:', buttonMeta.actions);
// Can now call: button.invokeAction('click', null, { actor: 'agent' })
```

## Versioning

The manifest version follows the format: `"MAJOR.MINOR"`

- **MAJOR**: Incremented for breaking changes to manifest schema
- **MINOR**: Incremented for new components or backward-compatible additions

Current version: **0.1**
