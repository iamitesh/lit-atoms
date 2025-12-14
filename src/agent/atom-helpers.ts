/**
 * Agent-Ready Helper Functions
 * 
 * Utilities for working with agent-ready components.
 */

import {
  AtomSemantics,
  AtomEventDetail,
  AtomInvokeContext,
  AtomInvokeResult,
  AtomPolicyFn,
  AtomA11yIssue
} from './atom-types.js';

/**
 * Read semantic metadata from element's dataset
 */
export function readSemanticsFromDataset(element: HTMLElement): AtomSemantics {
  const { dataset } = element;
  
  return {
    intent: dataset.intent,
    entity: dataset.entity,
    field: dataset.field,
    action: dataset.action,
    purpose: dataset.purpose,
    context: dataset.context
  };
}

/**
 * Emit an atom event from an element
 */
export function emitAtomEvent(
  element: HTMLElement,
  detail: Partial<AtomEventDetail>
): void {
  const fullDetail: AtomEventDetail = {
    component: element.tagName.toLowerCase(),
    id: element.id || undefined,
    actor: detail.actor || 'user',
    timestamp: Date.now(),
    semantics: detail.semantics || readSemanticsFromDataset(element),
    type: detail.type!,
    payload: detail.payload
  };
  
  element.dispatchEvent(
    new CustomEvent<AtomEventDetail>('atoms:event', {
      detail: fullDetail,
      bubbles: true,
      composed: true
    })
  );
}

/**
 * Check if element has proper labeling for accessibility
 */
export function a11yCheckLabeling(
  element: HTMLElement,
  options: {
    requiresLabel?: boolean;
    labelTarget?: HTMLElement | null;
  } = {}
): AtomA11yIssue[] {
  const issues: AtomA11yIssue[] = [];
  
  if (!options.requiresLabel) {
    return issues;
  }
  
  const target = options.labelTarget || element;
  
  // Check for various label sources
  const hasAriaLabel = !!target.getAttribute('aria-label');
  const hasAriaLabelledBy = !!target.getAttribute('aria-labelledby');
  const hasTextContent = !!(target.textContent?.trim());
  
  // For inputs, check for associated label element
  let hasAssociatedLabel = false;
  if (element.id && target.tagName === 'INPUT') {
    const label = document.querySelector(`label[for="${element.id}"]`);
    hasAssociatedLabel = !!label;
  }
  
  const isLabeled = hasAriaLabel || hasAriaLabelledBy || hasTextContent || hasAssociatedLabel;
  
  if (!isLabeled) {
    issues.push({
      code: 'MISSING_LABEL',
      message: 'Interactive element must have a label (visible text, aria-label, or aria-labelledby)',
      severity: 'error'
    });
  }
  
  return issues;
}

/**
 * Check if element has proper error description
 */
export function a11yCheckErrorDescription(
  element: HTMLElement,
  hasError: boolean,
  errorElementId?: string
): AtomA11yIssue[] {
  const issues: AtomA11yIssue[] = [];
  
  if (hasError && errorElementId) {
    const ariaDescribedBy = element.getAttribute('aria-describedby');
    if (!ariaDescribedBy || !ariaDescribedBy.includes(errorElementId)) {
      issues.push({
        code: 'MISSING_ERROR_DESCRIPTION',
        message: `Element with error should have aria-describedby pointing to error message`,
        severity: 'warning'
      });
    }
  }
  
  return issues;
}

/**
 * Apply policy check if policy function exists
 */
export function applyPolicyIfAny(
  policy: AtomPolicyFn | undefined,
  actionId: string,
  ctx: AtomInvokeContext
): AtomInvokeResult | null {
  if (!policy) {
    return null; // No policy, allow action
  }
  
  const decision = policy(actionId, ctx);
  
  if (!decision.allow) {
    return {
      ok: false,
      error: {
        code: 'POLICY_DENIED',
        message: decision.reason || 'Policy denied this action'
      }
    };
  }
  
  if (decision.requireConfirm && !ctx.confirmToken) {
    return {
      ok: false,
      error: {
        code: 'CONFIRM_REQUIRED',
        message: 'This action requires confirmation'
      }
    };
  }
  
  return null; // Policy allows action
}

/**
 * Check if value should be redacted (sensitive data)
 */
export function shouldRedactValue(element: HTMLElement): boolean {
  return element.dataset.sensitive === 'true';
}

/**
 * Redact sensitive value
 */
export function redactValue(value: any, element: HTMLElement): any {
  if (shouldRedactValue(element)) {
    return '[REDACTED]';
  }
  return value;
}
