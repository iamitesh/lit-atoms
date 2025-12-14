/**
 * Manifest type definitions
 */

export interface ComponentManifest {
  tag: string;
  name: string;
  category: string;
  description?: string;
  agentReady: boolean;
  
  props?: PropDescriptor[];
  slots?: SlotDescriptor[];
  events?: EventDescriptor[];
  
  intents?: string[];
  actions?: ActionDescriptor[];
  
  a11y?: {
    roles?: string[];
    keyboardSupport?: string;
    notes?: string[];
  };
}

export interface PropDescriptor {
  name: string;
  type: string;
  default?: any;
  required?: boolean;
  description?: string;
}

export interface SlotDescriptor {
  name: string;
  description?: string;
}

export interface EventDescriptor {
  name: string;
  description?: string;
  detail?: string;
}

export interface ActionDescriptor {
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
