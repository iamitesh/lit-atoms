import * as React from 'react';
import { LitInputField } from '../../../src/components/input-field.js';
import { createComponent } from './createComponent.js';

/**
 * Props for the React LitInputField component
 */
export interface LitInputFieldReactProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  onInputChange?: (e: CustomEvent<{ value: string }>) => void;
}

/**
 * React wrapper for the lit-input-field web component
 */
export const LitInputFieldReact = createComponent<LitInputField, LitInputFieldReactProps>({
  tagName: 'lit-input-field',
  elementClass: LitInputField,
  events: {
    onInputChange: 'input-change',
  },
});
