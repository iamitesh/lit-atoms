/**
 * Main Theme System
 * 3-Tier Style Dictionary for lit-atoms
 * 
 * Architecture:
 * 1. Base Tier: Foundation design tokens (colors, typography, spacing, etc.)
 * 2. Component Tier: Component-specific default styles
 * 3. Overrides Tier: User customization layer
 * 
 * Usage:
 * ```typescript
 * import { createTheme, defaultTheme } from 'lit-atoms/theme';
 * 
 * // Use default theme
 * const theme = defaultTheme;
 * 
 * // Create custom theme with overrides
 * const customTheme = createTheme({
 *   base: {
 *     palette: {
 *       primary: {
 *         main: '#ff0000',
 *       },
 *     },
 *   },
 *   components: {
 *     button: {
 *       defaultProps: {
 *         variant: 'secondary',
 *       },
 *     },
 *   },
 * });
 * ```
 */

import { defaultBaseTheme, type BaseTheme } from './base.js';
import {
  createComponentTheme,
  defaultComponentTheme,
  type ComponentTheme,
} from './components.js';
import {
  createThemeWithOverrides,
  generateCSSVariables,
  type ThemeOverrides,
  type DeepPartial,
} from './overrides.js';

/**
 * Complete Theme Interface
 */
export interface Theme {
  base: BaseTheme;
  components: ComponentTheme;
}

/**
 * Create a custom theme with optional overrides
 */
export function createTheme(overrides?: ThemeOverrides): Theme {
  const baseTheme = defaultBaseTheme;
  const componentTheme = createComponentTheme(baseTheme);
  
  return createThemeWithOverrides(baseTheme, componentTheme, overrides);
}

/**
 * Default theme instance
 */
export const defaultTheme: Theme = createTheme();

/**
 * Helper to get CSS variables from theme
 */
export function getThemeCSSVariables(theme: Theme): string {
  return generateCSSVariables(theme.base);
}

/**
 * Helper to create a theme from base theme object
 */
export function createThemeFromBase(
  baseTheme: BaseTheme,
  componentOverrides?: DeepPartial<ComponentTheme>
): Theme {
  const componentTheme = createComponentTheme(baseTheme);
  
  return createThemeWithOverrides(baseTheme, componentTheme, {
    components: componentOverrides,
  });
}

// Re-export types and utilities
export type {
  BaseTheme,
  Palette,
  Typography,
  TypographyStyle,
  Spacing,
  Shadows,
  BorderRadius,
  Breakpoints,
  Transitions,
  ZIndex,
} from './base.js';

export type {
  ComponentTheme,
  ButtonTheme,
  InputFieldTheme,
  CardTheme,
  BadgeTheme,
  AlertTheme,
  ModalTheme,
  ChipTheme,
} from './components.js';

export type {
  ThemeOverrides,
  DeepPartial,
} from './overrides.js';

export {
  defaultBaseTheme,
} from './base.js';

export {
  defaultComponentTheme,
  createComponentTheme,
} from './components.js';

export {
  deepMerge,
  applyOverrides,
  generateCSSVariables,
} from './overrides.js';
