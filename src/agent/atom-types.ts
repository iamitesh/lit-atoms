/**
 * Agent-Ready Type Definitions
 * 
 * These types define the contracts for agent-ready components in lit-atoms.
 */

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

/**
 * A11y issue descriptor
 */
export interface AtomA11yIssue {
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}
