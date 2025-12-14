/**
 * Token Usage Examples
 * 
 * This file demonstrates how to use the generated design tokens
 * from Style Dictionary in your Lit components and CSS.
 */

// ============================================================================
// Example 1: Using Tokens in JavaScript/TypeScript
// ============================================================================

import { ColorPrimaryMain, SpacingMd, TypographyFontFamilyBase } from '../build/tokens/js/tokens.js';

// Use in your component styles
const buttonStyles = `
  background-color: ${ColorPrimaryMain};
  padding: ${SpacingMd};
  font-family: ${TypographyFontFamilyBase};
`;

console.log('Button Styles:', buttonStyles);

// ============================================================================
// Example 2: Using Tokens with JSON Import
// ============================================================================

import tokens from '../build/tokens/json/tokens.json' assert { type: 'json' };

// Access nested token values
const theme = {
  colors: {
    primary: tokens.color.primary.main,
    secondary: tokens.color.secondary.main,
    error: tokens.color.error.main,
  },
  spacing: {
    small: tokens.spacing.sm,
    medium: tokens.spacing.md,
    large: tokens.spacing.lg,
  },
  typography: {
    fontFamily: tokens.typography.fontFamily.base,
    sizes: {
      small: tokens.typography.fontSize.sm,
      base: tokens.typography.fontSize.base,
      large: tokens.typography.fontSize.lg,
    },
  },
};

console.log('Theme Configuration:', theme);

// ============================================================================
// Example 3: Using CSS Variables in Lit Components
// ============================================================================

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// Make sure to import the CSS variables file in your HTML:
// <link rel="stylesheet" href="./build/tokens/css/variables.css">

@customElement('example-button')
class ExampleButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      /* Use CSS custom properties from tokens */
      background-color: var(--color-primary-main);
      color: var(--color-primary-contrast);
      padding: var(--spacing-sm) var(--spacing-md);
      border: none;
      border-radius: var(--border-radius-sm);
      font-family: var(--typography-font-family-base);
      font-size: var(--typography-font-size-base);
      font-weight: var(--typography-font-weight-medium);
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
    }

    button:hover {
      background-color: var(--color-primary-dark);
      box-shadow: var(--shadow-md);
    }

    button:active {
      box-shadow: var(--shadow-xs);
    }

    button.secondary {
      background-color: var(--color-secondary-main);
      color: var(--color-secondary-contrast);
    }

    button.large {
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: var(--typography-font-size-lg);
    }
  `;

  render() {
    return html`
      <button>
        <slot>Click me</slot>
      </button>
    `;
  }
}

// ============================================================================
// Example 4: Using Tokens in Inline Styles
// ============================================================================

@customElement('example-card')
class ExampleCard extends LitElement {
  static styles = css`
    .card {
      background-color: var(--color-background-paper);
      border-radius: var(--border-radius-md);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-md);
      border: var(--border-width-thin) solid var(--color-divider);
    }

    .card-header {
      color: var(--color-text-primary);
      font-size: var(--typography-font-size-xl);
      font-weight: var(--typography-font-weight-bold);
      margin-bottom: var(--spacing-md);
    }

    .card-body {
      color: var(--color-text-secondary);
      font-size: var(--typography-font-size-base);
      line-height: var(--typography-line-height-normal);
    }
  `;

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <slot name="header">Card Header</slot>
        </div>
        <div class="card-body">
          <slot>Card content goes here</slot>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// Example 5: Creating a Theme Object from Tokens
// ============================================================================

// This can be used to replace or enhance the existing theme system
export function createThemeFromTokens() {
  return {
    base: {
      palette: {
        primary: {
          main: tokens.color.primary.main,
          light: tokens.color.primary.light,
          dark: tokens.color.primary.dark,
          contrastText: tokens.color.primary.contrast,
        },
        secondary: {
          main: tokens.color.secondary.main,
          light: tokens.color.secondary.light,
          dark: tokens.color.secondary.dark,
          contrastText: tokens.color.secondary.contrast,
        },
        error: {
          main: tokens.color.error.main,
          light: tokens.color.error.light,
          dark: tokens.color.error.dark,
        },
        warning: {
          main: tokens.color.warning.main,
          light: tokens.color.warning.light,
          dark: tokens.color.warning.dark,
        },
        info: {
          main: tokens.color.info.main,
          light: tokens.color.info.light,
          dark: tokens.color.info.dark,
        },
        success: {
          main: tokens.color.success.main,
          light: tokens.color.success.light,
          dark: tokens.color.success.dark,
        },
        grey: tokens.color.grey,
        text: tokens.color.text,
        background: tokens.color.background,
        divider: tokens.color.divider,
      },
      typography: {
        fontFamily: tokens.typography.fontFamily.base,
        fontSize: tokens.typography.fontSize,
        fontWeight: tokens.typography.fontWeight,
        lineHeight: tokens.typography.lineHeight,
      },
      spacing: tokens.spacing,
      shadows: tokens.shadow,
      borderRadius: tokens.border.radius,
      borderWidth: tokens.border.width,
    },
  };
}

// ============================================================================
// Example 6: Programmatic Style Generation
// ============================================================================

export function generateButtonStyles(variant = 'primary', size = 'medium') {
  const variantStyles = {
    primary: {
      background: tokens.color.primary.main,
      color: tokens.color.primary.contrast,
      hoverBackground: tokens.color.primary.dark,
    },
    secondary: {
      background: tokens.color.secondary.main,
      color: tokens.color.secondary.contrast,
      hoverBackground: tokens.color.secondary.dark,
    },
    error: {
      background: tokens.color.error.main,
      color: tokens.color.error.contrast,
      hoverBackground: tokens.color.error.dark,
    },
  };

  const sizeStyles = {
    small: {
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      fontSize: tokens.typography.fontSize.sm,
    },
    medium: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: tokens.typography.fontSize.base,
    },
    large: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      fontSize: tokens.typography.fontSize.lg,
    },
  };

  const variant_style = variantStyles[variant] || variantStyles.primary;
  const size_style = sizeStyles[size] || sizeStyles.medium;

  return {
    backgroundColor: variant_style.background,
    color: variant_style.color,
    padding: size_style.padding,
    fontSize: size_style.fontSize,
    borderRadius: tokens.border.radius.sm,
    border: 'none',
    fontFamily: tokens.typography.fontFamily.base,
    fontWeight: tokens.typography.fontWeight.medium,
    cursor: 'pointer',
    boxShadow: tokens.shadow.sm,
    ':hover': {
      backgroundColor: variant_style.hoverBackground,
      boxShadow: tokens.shadow.md,
    },
  };
}

// ============================================================================
// Example 7: Responsive Design with Tokens
// ============================================================================

@customElement('example-responsive')
class ExampleResponsive extends LitElement {
  static styles = css`
    .container {
      padding: var(--spacing-md);
      background: var(--color-background-default);
    }

    /* Mobile first approach */
    .content {
      font-size: var(--typography-font-size-sm);
      padding: var(--spacing-sm);
    }

    /* Tablet */
    @media (min-width: 768px) {
      .content {
        font-size: var(--typography-font-size-base);
        padding: var(--spacing-md);
      }
    }

    /* Desktop */
    @media (min-width: 1024px) {
      .content {
        font-size: var(--typography-font-size-lg);
        padding: var(--spacing-lg);
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="content">
          <slot>Responsive content</slot>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// Usage Instructions
// ============================================================================

/*
To use these examples in your project:

1. Import the CSS variables in your HTML:
   <link rel="stylesheet" href="./build/tokens/css/variables.css">

2. Import token modules in your JS/TS:
   import tokens from './build/tokens/json/tokens.json';
   // or
   import { ColorPrimaryMain } from './build/tokens/js/tokens.js';

3. Use CSS custom properties in your styles:
   .my-element {
     color: var(--color-primary-main);
     padding: var(--spacing-md);
   }

4. Use token objects in your JavaScript:
   const primaryColor = tokens.color.primary.main;

5. Update tokens by syncing from Figma:
   npm run figma:sync

6. Rebuild tokens after changes:
   npm run tokens:build

For more information, see:
- docs/FIGMA_INTEGRATION.md
- docs/FIGMA_QUICK_START.md
*/
