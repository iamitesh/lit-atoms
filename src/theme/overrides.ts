/**
 * Theme Overrides Tier
 * User customization layer with deep merge utilities
 */

import type { BaseTheme } from './base.js';
import type { ComponentTheme } from './components.js';

/**
 * Deep partial type for theme customization
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Theme Overrides Interface
 */
export interface ThemeOverrides {
  base?: DeepPartial<BaseTheme>;
  components?: DeepPartial<ComponentTheme>;
}

/**
 * Deep merge utility function
 * Recursively merges source objects into target
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Array<DeepPartial<T>>
): T {
  if (!sources.length) return target;
  
  const source = sources.shift();
  if (!source) return deepMerge(target, ...sources);

  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue });
        } else {
          (output as any)[key] = deepMerge(
            targetValue as Record<string, any>,
            sourceValue as Record<string, any>
          );
        }
      } else {
        Object.assign(output, { [key]: sourceValue });
      }
    });
  }

  return deepMerge(output, ...sources);
}

/**
 * Type guard for objects
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Apply overrides to a theme
 */
export function applyOverrides<T extends Record<string, any>>(
  baseTheme: T,
  overrides?: DeepPartial<T>
): T {
  if (!overrides) return baseTheme;
  return deepMerge({ ...baseTheme }, overrides);
}

/**
 * Create a custom theme with overrides
 */
export function createThemeWithOverrides(
  baseTheme: BaseTheme,
  componentTheme: ComponentTheme,
  overrides?: ThemeOverrides
): { base: BaseTheme; components: ComponentTheme } {
  const mergedBase = overrides?.base
    ? applyOverrides(baseTheme, overrides.base)
    : baseTheme;

  const mergedComponents = overrides?.components
    ? applyOverrides(componentTheme, overrides.components)
    : componentTheme;

  return {
    base: mergedBase,
    components: mergedComponents,
  };
}

/**
 * CSS variable generator
 * Converts theme to CSS custom properties
 */
export function generateCSSVariables(theme: BaseTheme): string {
  return `
    /* Colors - Primary */
    --color-primary-main: ${theme.palette.primary.main};
    --color-primary-light: ${theme.palette.primary.light};
    --color-primary-dark: ${theme.palette.primary.dark};
    --color-primary-contrast: ${theme.palette.primary.contrastText};
    
    /* Colors - Secondary */
    --color-secondary-main: ${theme.palette.secondary.main};
    --color-secondary-light: ${theme.palette.secondary.light};
    --color-secondary-dark: ${theme.palette.secondary.dark};
    --color-secondary-contrast: ${theme.palette.secondary.contrastText};
    
    /* Colors - Error */
    --color-error-main: ${theme.palette.error.main};
    --color-error-light: ${theme.palette.error.light};
    --color-error-dark: ${theme.palette.error.dark};
    --color-error-contrast: ${theme.palette.error.contrastText};
    
    /* Colors - Warning */
    --color-warning-main: ${theme.palette.warning.main};
    --color-warning-light: ${theme.palette.warning.light};
    --color-warning-dark: ${theme.palette.warning.dark};
    --color-warning-contrast: ${theme.palette.warning.contrastText};
    
    /* Colors - Info */
    --color-info-main: ${theme.palette.info.main};
    --color-info-light: ${theme.palette.info.light};
    --color-info-dark: ${theme.palette.info.dark};
    --color-info-contrast: ${theme.palette.info.contrastText};
    
    /* Colors - Success */
    --color-success-main: ${theme.palette.success.main};
    --color-success-light: ${theme.palette.success.light};
    --color-success-dark: ${theme.palette.success.dark};
    --color-success-contrast: ${theme.palette.success.contrastText};
    
    /* Colors - Grey */
    --color-grey-50: ${theme.palette.grey[50]};
    --color-grey-100: ${theme.palette.grey[100]};
    --color-grey-200: ${theme.palette.grey[200]};
    --color-grey-300: ${theme.palette.grey[300]};
    --color-grey-400: ${theme.palette.grey[400]};
    --color-grey-500: ${theme.palette.grey[500]};
    --color-grey-600: ${theme.palette.grey[600]};
    --color-grey-700: ${theme.palette.grey[700]};
    --color-grey-800: ${theme.palette.grey[800]};
    --color-grey-900: ${theme.palette.grey[900]};
    
    /* Text */
    --text-primary: ${theme.palette.text.primary};
    --text-secondary: ${theme.palette.text.secondary};
    --text-disabled: ${theme.palette.text.disabled};
    
    /* Background */
    --background-default: ${theme.palette.background.default};
    --background-paper: ${theme.palette.background.paper};
    
    /* Divider */
    --divider: ${theme.palette.divider};
    
    /* Typography */
    --font-family: ${theme.typography.fontFamily};
    --font-size-base: ${theme.typography.fontSize}px;
    --font-weight-light: ${theme.typography.fontWeightLight};
    --font-weight-regular: ${theme.typography.fontWeightRegular};
    --font-weight-medium: ${theme.typography.fontWeightMedium};
    --font-weight-bold: ${theme.typography.fontWeightBold};
    
    /* Spacing */
    --spacing-unit: ${theme.spacing.unit}px;
    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};
    --spacing-xxl: ${theme.spacing.xxl};
    
    /* Shadows */
    --shadow-none: ${theme.shadows.none};
    --shadow-xs: ${theme.shadows.xs};
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-xl: ${theme.shadows.xl};
    
    /* Border Radius */
    --radius-none: ${theme.borderRadius.none};
    --radius-xs: ${theme.borderRadius.xs};
    --radius-sm: ${theme.borderRadius.sm};
    --radius-md: ${theme.borderRadius.md};
    --radius-lg: ${theme.borderRadius.lg};
    --radius-xl: ${theme.borderRadius.xl};
    --radius-full: ${theme.borderRadius.full};
    
    /* Transitions */
    --transition-duration-shortest: ${theme.transitions.duration.shortest}ms;
    --transition-duration-shorter: ${theme.transitions.duration.shorter}ms;
    --transition-duration-short: ${theme.transitions.duration.short}ms;
    --transition-duration-standard: ${theme.transitions.duration.standard}ms;
    --transition-duration-complex: ${theme.transitions.duration.complex}ms;
    --transition-easing-in-out: ${theme.transitions.easing.easeInOut};
    --transition-easing-out: ${theme.transitions.easing.easeOut};
    --transition-easing-in: ${theme.transitions.easing.easeIn};
    --transition-easing-sharp: ${theme.transitions.easing.sharp};
    
    /* Z-Index */
    --z-index-mobile-stepper: ${theme.zIndex.mobileStepper};
    --z-index-speed-dial: ${theme.zIndex.speedDial};
    --z-index-app-bar: ${theme.zIndex.appBar};
    --z-index-drawer: ${theme.zIndex.drawer};
    --z-index-modal: ${theme.zIndex.modal};
    --z-index-snackbar: ${theme.zIndex.snackbar};
    --z-index-tooltip: ${theme.zIndex.tooltip};
  `;
}
