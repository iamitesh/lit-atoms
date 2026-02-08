import * as React from 'react';
import { createComponent as createLitComponent } from '@lit/react';

/**
 * Options for creating a React wrapper component
 */
export interface CreateComponentOptions {
  tagName: string;
  elementClass: typeof HTMLElement;
  events?: Record<string, string>;
}

/**
 * Creates a React wrapper component for a Lit web component.
 * This utility handles:
 * - Proper ref forwarding to the underlying HTMLElement
 * - Event binding for custom events
 * - Property assignment to element prototype properties
 * 
 * @param options - Configuration options
 * @returns A React component that wraps the Lit element
 */
export function createComponent<T extends HTMLElement, P extends object>(
  options: CreateComponentOptions
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & React.HTMLAttributes<T>> & React.RefAttributes<T>
> {
  const { tagName, elementClass, events = {} } = options;

  // Use @lit/react's createComponent which handles the heavy lifting
  // It properly splits React props vs element properties
  // and manages event listeners
  return createLitComponent({
    react: React,
    tagName,
    elementClass,
    events,
  }) as any;
}
