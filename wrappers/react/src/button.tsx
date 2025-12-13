import * as React from 'react';
import { LitButton } from '../../../src/components/button.js';
import { createComponent } from './createComponent.js';

/**
 * Props for the React LitButton component
 */
export interface LitButtonReactProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onButtonClick?: (e: CustomEvent) => void;
}

/**
 * React wrapper for the lit-button web component
 */
export const LitButtonReact = createComponent<LitButton, LitButtonReactProps>({
  tagName: 'lit-button',
  elementClass: LitButton,
  events: {
    onButtonClick: 'button-click',
  },
});
