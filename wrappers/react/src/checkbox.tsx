import * as React from 'react';
import { LitCheckbox } from 'lit-atoms';
import { createComponent } from './createComponent.js';

/**
 * Props for the React LitCheckbox component
 */
export interface LitCheckboxReactProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  value?: string;
  onCheckboxChange?: (e: CustomEvent<{ checked: boolean; value: string }>) => void;
}

/**
 * React wrapper for the lit-checkbox web component
 */
export const LitCheckboxReact = createComponent<LitCheckbox, LitCheckboxReactProps>({
  tagName: 'lit-checkbox',
  elementClass: LitCheckbox,
  events: {
    onCheckboxChange: 'checkbox-change',
  },
});
