# Agent-Ready Specification v0.1

## Overview

This document defines the interfaces, event schema, and behavioral requirements for agent-ready components in `lit-atoms`.

## TypeScript Interfaces

### Core Interfaces

```typescript
/**
 * Base interface for agent-ready components
 */
export interface AtomAgentReady {
  /**
   * Get current state of the component
   */
  getState(): AtomBaseState;
  
  /**
   * Get list of available actions
   */
  getActions(): AtomActionDescriptor[];
  
  /**
   * Invoke an action on the component
   * @param actionId - The action to invoke
   * @param params - Optional action parameters
   * @param ctx - Invocation context (actor, confirmToken, etc.)
   * @returns Result indicating success or failure
   */
  invokeAction(
    actionId: string, 
    params?: Record<string, any>, 
    ctx?: AtomInvokeContext
  ): Promise<AtomInvokeResult> | AtomInvokeResult;
}

/**
 * Base state structure returned by getState()
 */
export interface AtomBaseState {
  value: any;
  disabled: boolean;
  readonly?: boolean;
  error?: string;
  valid?: boolean;
  semantics: AtomSemantics;
}

/**
 * Semantic metadata from data-* attributes
 */
export interface AtomSemantics {
  intent?: string;      // data-intent
  entity?: string;      // data-entity
  field?: string;       // data-field
  action?: string;      // data-action
  purpose?: string;     // data-purpose
  context?: string;     // data-context
}

/**
 * Descriptor for an available action
 */
export interface AtomActionDescriptor {
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

/**
 * Context passed when invoking an action
 */
export interface AtomInvokeContext {
  actor: 'user' | 'agent';
  confirmToken?: string;
  metadata?: Record<string, any>;
}

/**
 * Result of invoking an action
 */
export interface AtomInvokeResult {
  ok: boolean;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * Policy function for action validation
 */
export type AtomPolicyFn = (
  action: string,
  ctx: AtomInvokeContext
) => AtomPolicyDecision;

/**
 * Policy decision returned by policy function
 */
export interface AtomPolicyDecision {
  allow: boolean;
  requireConfirm?: boolean;
  reason?: string;
}
```

### Event Schema

```typescript
/**
 * Unified atom event detail structure
 */
export interface AtomEventDetail {
  type: AtomEventType;
  component: string;        // Element tag name
  id?: string;              // Element ID if present
  actor: 'user' | 'agent';
  timestamp: number;        // Unix timestamp in ms
  semantics?: AtomSemantics;
  payload?: any;
}

/**
 * Standard atom event types
 */
export type AtomEventType = 
  | 'atoms.usage'     // Component first used/rendered
  | 'atoms.change'    // Value changed
  | 'atoms.action'    // Action invoked
  | 'atoms.error'     // Error occurred
  | 'atoms.a11y';     // A11y issue detected
```

## Event Emission Requirements

### Event Name and Options

All agent-ready components MUST emit events with:
- Event name: `atoms:event`
- Event options: `{ bubbles: true, composed: true }`
- Event detail: conforming to `AtomEventDetail`

### Event Types and Payloads

#### atoms.usage

Emitted once when component is first connected or rendered.

```typescript
{
  type: 'atoms.usage',
  component: 'lit-button',
  id: 'submitBtn',
  actor: 'user',
  timestamp: 1702500000000,
  semantics: {
    intent: 'submit',
    entity: 'order'
  },
  payload: {
    variant: 'primary',
    label: 'Submit Order'
  }
}
```

#### atoms.change

Emitted when component value changes.

```typescript
{
  type: 'atoms.change',
  component: 'lit-input-field',
  id: 'emailInput',
  actor: 'user',
  timestamp: 1702500001000,
  semantics: {
    field: 'email'
  },
  payload: {
    value: 'user@example.com',  // or "[REDACTED]" if data-sensitive="true"
    previousValue: '',
    valid: true
  }
}
```

#### atoms.action

Emitted when an action is invoked (click, submit, etc.).

```typescript
{
  type: 'atoms.action',
  component: 'lit-button',
  id: 'submitBtn',
  actor: 'agent',  // or 'user'
  timestamp: 1702500002000,
  semantics: {
    intent: 'submit'
  },
  payload: {
    actionId: 'click',
    params: {},
    result: { ok: true }
  }
}
```

#### atoms.error

Emitted when an error occurs.

```typescript
{
  type: 'atoms.error',
  component: 'lit-input-field',
  id: 'emailInput',
  actor: 'user',
  timestamp: 1702500003000,
  payload: {
    error: 'Invalid email format',
    code: 'VALIDATION_ERROR'
  }
}
```

#### atoms.a11y

Emitted when an accessibility issue is detected.

```typescript
{
  type: 'atoms.a11y',
  component: 'lit-button',
  id: 'submitBtn',
  actor: 'user',
  timestamp: 1702500004000,
  payload: {
    issue: 'MISSING_LABEL',
    severity: 'error',
    suggestion: 'Add aria-label or visible label text'
  }
}
```

## Action Invocation Requirements

### Standard Checks

`invokeAction()` MUST perform these checks in order:

1. **Action exists** - Return `{ ok: false, error: { code: 'UNKNOWN_ACTION' } }`
2. **Not disabled** - If `disabled=true`, return `{ ok: false, error: { code: 'COMPONENT_DISABLED' } }`
3. **Not readonly** - If `readonly=true` (for inputs), return `{ ok: false, error: { code: 'COMPONENT_READONLY' } }`
4. **Policy check** - If policy denies, return `{ ok: false, error: { code: 'POLICY_DENIED' } }`
5. **Confirmation** - If requires confirm and no token, return `{ ok: false, error: { code: 'CONFIRM_REQUIRED' } }`

### Example Implementation

```typescript
async invokeAction(
  actionId: string, 
  params?: Record<string, any>, 
  ctx?: AtomInvokeContext
): Promise<AtomInvokeResult> {
  const context = ctx || { actor: 'user' };
  
  // Check if action exists
  const actions = this.getActions();
  const action = actions.find(a => a.id === actionId);
  if (!action) {
    return { ok: false, error: { code: 'UNKNOWN_ACTION', message: `Action '${actionId}' not found` } };
  }
  
  // Check disabled state
  if (this.disabled) {
    return { ok: false, error: { code: 'COMPONENT_DISABLED', message: 'Component is disabled' } };
  }
  
  // Apply policy if present
  if (this.policy) {
    const decision = this.policy(actionId, context);
    if (!decision.allow) {
      return { ok: false, error: { code: 'POLICY_DENIED', message: decision.reason || 'Policy denied action' } };
    }
    if (decision.requireConfirm && !context.confirmToken) {
      return { ok: false, error: { code: 'CONFIRM_REQUIRED', message: 'Action requires confirmation' } };
    }
  }
  
  // Perform the action
  // ... action-specific logic ...
  
  // Emit atoms.action event
  this.emitAtomEvent({
    type: 'atoms.action',
    actor: context.actor,
    payload: { actionId, params, result: { ok: true } }
  });
  
  return { ok: true };
}
```

## Semantic Attributes

### Reading Semantics

Components should read semantics using the helper:

```typescript
import { readSemanticsFromDataset } from '../agent/atom-helpers.js';

const semantics = readSemanticsFromDataset(this);
// Returns: { intent?: string, entity?: string, ... }
```

### Supported Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-intent` | User's goal | `"submit"`, `"cancel"`, `"search"` |
| `data-entity` | Business entity | `"user"`, `"order"`, `"product"` |
| `data-field` | Specific field | `"email"`, `"password"`, `"quantity"` |
| `data-action` | CRUD action | `"create"`, `"update"`, `"delete"` |
| `data-purpose` | UI purpose | `"navigation"`, `"data-entry"`, `"filter"` |
| `data-context` | Additional context | `"checkout-flow"`, `"user-profile"` |
| `data-sensitive` | Sensitive data flag | `"true"` (redacts value in events) |

## Accessibility Requirements

### Labeling Check

Interactive components MUST check for proper labeling:

```typescript
import { a11yCheckLabeling } from '../agent/atom-helpers.js';

connectedCallback() {
  super.connectedCallback();
  
  // Check after render
  this.updateComplete.then(() => {
    const issues = a11yCheckLabeling(this, {
      requiresLabel: true,
      labelTarget: this.shadowRoot?.querySelector('button')
    });
    
    if (issues.length > 0) {
      this.emitAtomEvent({
        type: 'atoms.a11y',
        actor: 'user',
        payload: {
          issue: issues[0].code,
          severity: 'error',
          suggestion: issues[0].message
        }
      });
    }
  });
}
```

### Label Sources

A component is considered labeled if ANY of these exist:
1. Visible text content
2. `aria-label` attribute
3. `aria-labelledby` pointing to valid element
4. Associated `<label>` element (for inputs)

### Error Feedback

If component has an error message, ensure `aria-describedby` points to the error text element.

## Policy Guardrails

### Optional Policy Property

Components MAY accept a policy function:

```typescript
@property({ attribute: false })
policy?: AtomPolicyFn;
```

### Policy Example

```typescript
button.policy = (action, ctx) => {
  if (action === 'click' && ctx.actor === 'agent') {
    // Require confirmation for agent-initiated clicks
    return {
      allow: true,
      requireConfirm: true,
      reason: 'Agent actions require confirmation'
    };
  }
  return { allow: true };
};
```

### Error Codes

| Code | Meaning |
|------|---------|
| `UNKNOWN_ACTION` | Action ID not found in getActions() |
| `COMPONENT_DISABLED` | Component is disabled |
| `COMPONENT_READONLY` | Component is readonly (inputs) |
| `POLICY_DENIED` | Policy function denied the action |
| `CONFIRM_REQUIRED` | Action requires confirmation token |
| `VALIDATION_ERROR` | Input validation failed |

## Sensitive Data Handling

When `data-sensitive="true"`:

1. Read the attribute in component
2. When emitting `atoms.change`, redact the value:

```typescript
const sensitive = this.dataset.sensitive === 'true';
const value = sensitive ? '[REDACTED]' : this.value;

emitAtomEvent(this, {
  type: 'atoms.change',
  actor: 'user',
  payload: { value, previousValue: '[REDACTED]' }
});
```

## Backward Compatibility

Agent-ready components MUST maintain backward compatibility:

1. Keep existing custom events (e.g., `button-click`, `input-change`)
2. New methods (`getState`, `getActions`, `invokeAction`) are additive
3. `data-*` attributes are read-only and don't affect existing behavior
4. `policy` property is optional and non-intrusive

## Version

This specification is version **0.1** and subject to evolution based on real-world usage and feedback.
