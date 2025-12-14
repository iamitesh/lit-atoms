# Agent-Ready Overview

## What is Agent-Ready?

The **agent-ready** capability in `lit-atoms` enables AI assistants and automation agents to understand, introspect, and interact with web components in a safe, predictable manner. This is achieved through:

1. **Standard semantics** - Components expose their purpose and context via `data-*` attributes
2. **Introspection** - Components provide methods to query their current state
3. **Safe actions** - Components offer controlled action invocation with policy guardrails
4. **Unified events** - All agent-relevant activities emit standardized `atoms:event` for observability
5. **Manifest** - A machine-readable catalog describes component capabilities

## Core Concepts

### 1. Semantics via Dataset

Components read semantic hints from their `data-*` attributes:

- `data-intent` - What the user intends to accomplish (e.g., "submit", "cancel", "filter")
- `data-entity` - The business entity being operated on (e.g., "user", "order", "product")
- `data-field` - The specific field or property (e.g., "email", "quantity")
- `data-action` - The action being performed (e.g., "create", "update", "delete")
- `data-purpose` - The UI purpose (e.g., "search", "navigation", "data-entry")
- `data-context` - Additional context (e.g., "checkout-flow", "user-profile")

### 2. State Introspection

Agent-ready components implement `getState()` which returns:

```typescript
{
  value: any;           // Current value
  disabled: boolean;    // Is component disabled
  readonly?: boolean;   // Is component read-only
  error?: string;       // Current error message
  valid?: boolean;      // Validation state
  semantics: {          // Semantic metadata
    intent?: string;
    entity?: string;
    field?: string;
    // ...
  }
}
```

### 3. Safe Actions

Components expose available actions via `getActions()`:

```typescript
[
  {
    id: 'click',
    label: 'Click button',
    destructive: false,
    requiresConfirm: false
  }
]
```

Agents can invoke actions via `invokeAction(actionId, params?, ctx?)` which:
- Respects `disabled` and `readonly` states
- Enforces optional policy constraints
- Returns `{ ok: true }` or `{ ok: false, error: {...} }`

### 4. Policy Guardrails

Components may accept a `policy` function:

```typescript
type AtomPolicyFn = (action: string, ctx: AtomInvokeContext) => AtomPolicyDecision;
```

Policy can:
- **Allow** the action
- **Deny** the action (returns `POLICY_DENIED` error)
- **Require confirmation** (returns `CONFIRM_REQUIRED` error if no token)

### 5. Sensitive Data

Inputs can mark fields as sensitive with `data-sensitive="true"`. When set:
- `atoms.change` events redact the value as `"[REDACTED]"`
- Prevents accidental logging of passwords, credit cards, etc.

### 6. Unified Events

All agent-ready components emit a single event type: `atoms:event`

Event types:
- `atoms.usage` - Component first rendered/used
- `atoms.change` - Value changed
- `atoms.action` - Action invoked (click, submit, etc.)
- `atoms.error` - Error occurred
- `atoms.a11y` - Accessibility issue detected

Events include:
- Component tag and ID
- Actor (`user` or `agent`)
- Timestamp
- Semantic context
- Relevant payload data

## Quick Example

### Basic Usage - Button

```html
<lit-button 
  id="submitBtn"
  label="Submit Order" 
  variant="primary"
  data-intent="submit"
  data-entity="order"
  data-action="create"
></lit-button>

<script>
  const btn = document.getElementById('submitBtn');
  
  // Get current state
  const state = btn.getState();
  console.log(state); // { value: null, disabled: false, semantics: {...} }
  
  // Get available actions
  const actions = btn.getActions();
  console.log(actions); // [{ id: 'click', label: 'Click button', ... }]
  
  // Invoke action programmatically
  const result = await btn.invokeAction('click', null, { actor: 'agent' });
  console.log(result); // { ok: true }
  
  // Listen to atoms events
  document.addEventListener('atoms:event', (e) => {
    console.log('Atom event:', e.detail);
    // { type: 'atoms.action', component: 'lit-button', ... }
  });
</script>
```

### Input Field with Semantics

```html
<lit-input-field
  id="emailInput"
  label="Email Address"
  type="email"
  data-intent="login"
  data-field="email"
  data-purpose="authentication"
></lit-input-field>

<script>
  const input = document.getElementById('emailInput');
  
  // Get state
  const state = input.getState();
  console.log(state.semantics.field); // "email"
  
  // Set value via action
  await input.invokeAction('setValue', { value: 'user@example.com' }, { actor: 'agent' });
  
  // Listen for changes
  document.addEventListener('atoms:event', (e) => {
    if (e.detail.type === 'atoms.change' && e.detail.component === 'lit-input-field') {
      console.log('Input changed:', e.detail.payload.value);
    }
  });
</script>
```

### Sensitive Field

```html
<lit-input-field
  label="Password"
  type="password"
  data-field="password"
  data-sensitive="true"
></lit-input-field>

<!-- atoms.change events will show value as "[REDACTED]" -->
```

## Benefits for AI Assistants

An AI assistant embedded in your application can:

1. **Understand UI intent** - Know what each component is for without DOM scraping
2. **Read current state** - Query component values and validation state
3. **Take safe actions** - Click buttons, fill forms with guardrails
4. **Observe activity** - Learn from user interactions via event logs
5. **Diagnose issues** - Detect accessibility problems and validation errors
6. **Provide context-aware help** - Suggest fixes based on component semantics

## Next Steps

- Read the [Full Specification](./spec-v0.1.md) for implementation details
- Learn about [Manifest Generation](./manifest.md)
- Explore the [Playground Console](./playground-console.md)
