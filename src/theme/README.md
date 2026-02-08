# Theme System Documentation

## Overview

The lit-atoms library provides a comprehensive **3-tier style dictionary system** similar to Material-UI (MUI), allowing for consistent and customizable theming across all components.

## Architecture

### Tier 1: Base Theme (Foundation)
The base theme defines foundational design tokens:
- **Palette**: Colors (primary, secondary, error, warning, info, success, grey scale, text, background)
- **Typography**: Font families, sizes, weights, and text styles
- **Spacing**: Consistent spacing units and scales
- **Shadows**: Elevation shadows
- **Border Radius**: Rounded corner scales
- **Breakpoints**: Responsive breakpoint values
- **Transitions**: Animation durations and easing functions
- **Z-Index**: Layering hierarchy

### Tier 2: Component Theme
Component-specific theming that builds upon the base theme:
- **Default Props**: Default property values for components
- **Style Overrides**: Component-specific style customizations

Supported components:
- Button
- Input Field
- Card
- Badge
- Alert
- Modal
- Chip

### Tier 3: Overrides
User customization layer with deep merge functionality:
- Override any base theme value
- Override any component theme value
- Deep merge ensures partial overrides work seamlessly

## Usage

### 1. Using the Default Theme

```typescript
import { defaultTheme } from 'lit-atoms';

// Access base theme values
console.log(defaultTheme.base.palette.primary.main); // '#1ea7fd'
console.log(defaultTheme.base.spacing.md); // '16px'

// Access component theme values
console.log(defaultTheme.components.button.defaultProps.variant); // 'primary'
```

### 2. Creating a Custom Theme

```typescript
import { createTheme } from 'lit-atoms';

const customTheme = createTheme({
  base: {
    palette: {
      primary: {
        main: '#ff0000',
        light: '#ff5555',
        dark: '#cc0000',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00ff00',
      },
    },
    spacing: {
      md: '20px',
      lg: '32px',
    },
    borderRadius: {
      md: '12px',
    },
  },
  components: {
    button: {
      defaultProps: {
        variant: 'secondary',
        size: 'large',
      },
    },
    card: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

### 3. Partial Overrides

You only need to specify the values you want to override:

```typescript
import { createTheme } from 'lit-atoms';

const brandedTheme = createTheme({
  base: {
    palette: {
      primary: {
        main: '#yourBrandColor',
      },
    },
  },
});

// All other theme values use defaults
```

### 4. Using CSS Variables

Generate CSS custom properties from your theme:

```typescript
import { getThemeCSSVariables } from 'lit-atoms';

const cssVars = getThemeCSSVariables(customTheme);

// Apply to your application
const styleElement = document.createElement('style');
styleElement.textContent = `:root { ${cssVars} }`;
document.head.appendChild(styleElement);
```

Available CSS variables include:
```css
--color-primary-main
--color-primary-light
--color-primary-dark
--spacing-md
--spacing-lg
--shadow-sm
--radius-md
--font-family
--transition-duration-standard
/* ... and many more */
```

### 5. Creating Theme from Custom Base

```typescript
import { createThemeFromBase } from 'lit-atoms';

const myBaseTheme = {
  // ... custom base theme configuration
};

const theme = createThemeFromBase(myBaseTheme, {
  button: {
    defaultProps: {
      variant: 'secondary',
    },
  },
});
```

## Theme Structure Reference

### Base Theme Properties

```typescript
interface BaseTheme {
  palette: {
    primary: ColorScale;
    secondary: ColorScale;
    error: ColorScale;
    warning: ColorScale;
    info: ColorScale;
    success: ColorScale;
    grey: GreyScale;
    text: TextColors;
    background: BackgroundColors;
    divider: string;
  };
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  borderRadius: BorderRadius;
  breakpoints: Breakpoints;
  transitions: Transitions;
  zIndex: ZIndex;
}
```

### Component Theme Properties

```typescript
interface ComponentTheme {
  button: {
    defaultProps: {
      variant: 'primary' | 'secondary';
      size: 'small' | 'medium' | 'large';
    };
    styleOverrides: {
      root: string;
      primary: string;
      secondary: string;
      small: string;
      medium: string;
      large: string;
    };
  };
  // ... other components
}
```

## Examples

### Example 1: Dark Mode Theme

```typescript
const darkTheme = createTheme({
  base: {
    palette: {
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
        disabled: '#707070',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      divider: '#2c2c2c',
    },
  },
});
```

### Example 2: Brand-Specific Theme

```typescript
const brandTheme = createTheme({
  base: {
    palette: {
      primary: {
        main: '#6366f1', // Indigo
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ec4899', // Pink
        light: '#f472b6',
        dark: '#db2777',
        contrastText: '#ffffff',
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },
});
```

### Example 3: Compact Theme

```typescript
const compactTheme = createTheme({
  base: {
    spacing: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      xxl: '24px',
    },
  },
  components: {
    button: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});
```

## Best Practices

1. **Define your theme early**: Create your theme configuration at the application entry point
2. **Use design tokens**: Leverage the base theme values instead of hardcoded values
3. **Consistent spacing**: Use the spacing scale for all layout decisions
4. **Color semantics**: Use semantic color names (primary, error, success) rather than specific colors
5. **Type safety**: Leverage TypeScript types for theme customization
6. **CSS variables**: Use CSS variables for runtime theme switching capabilities

## Migration Guide

If you have existing components with hardcoded styles, you can gradually migrate to the theme system:

1. Replace hardcoded colors with theme palette values
2. Replace spacing values with theme spacing scale
3. Replace font properties with typography tokens
4. Replace shadow values with theme shadows
5. Utilize CSS variables for dynamic theming

## API Reference

### Functions

- `createTheme(overrides?: ThemeOverrides): Theme` - Create a theme with optional overrides
- `getThemeCSSVariables(theme: Theme): string` - Generate CSS variables from theme
- `createThemeFromBase(baseTheme: BaseTheme, componentOverrides?: DeepPartial<ComponentTheme>): Theme` - Create theme from custom base

### Exports

- `defaultTheme` - Default theme instance
- `defaultBaseTheme` - Default base theme
- `defaultComponentTheme` - Default component theme
- All type exports for TypeScript usage

## Future Enhancements

Potential future additions to the theme system:
- Theme provider component for scoped theming
- Runtime theme switching utilities
- Additional component themes
- Theme presets library
- Advanced color manipulation utilities
