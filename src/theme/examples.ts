/**
 * Theme Usage Examples
 * Practical demonstrations of the 3-tier theme system
 */

import { createTheme, defaultTheme, getThemeCSSVariables } from '../theme/index.js';

// ============================================================================
// Example 1: Using the Default Theme
// ============================================================================
export function example1_defaultTheme() {
  console.log('=== Example 1: Default Theme ===');
  console.log('Primary color:', defaultTheme.base.palette.primary.main);
  console.log('Font family:', defaultTheme.base.typography.fontFamily);
  console.log('Medium spacing:', defaultTheme.base.spacing.md);
  console.log('Button default variant:', defaultTheme.components.button.defaultProps.variant);
}

// ============================================================================
// Example 2: Creating a Custom Branded Theme
// ============================================================================
export function example2_customBrandTheme() {
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
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeightBold: 700,
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
      },
      shadows: {
        sm: '0 2px 8px rgba(99, 102, 241, 0.15)',
        md: '0 4px 12px rgba(99, 102, 241, 0.2)',
        lg: '0 8px 24px rgba(99, 102, 241, 0.25)',
      },
    },
    components: {
      button: {
        defaultProps: {
          variant: 'primary',
          size: 'medium',
        },
      },
    },
  });

  console.log('=== Example 2: Custom Brand Theme ===');
  console.log('Brand primary:', brandTheme.base.palette.primary.main);
  console.log('Brand font:', brandTheme.base.typography.fontFamily);
  
  return brandTheme;
}

// ============================================================================
// Example 3: Dark Mode Theme
// ============================================================================
export function example3_darkTheme() {
  const darkTheme = createTheme({
    base: {
      palette: {
        primary: {
          main: '#5ec2ff',
          light: '#8ed5ff',
          dark: '#0077c2',
          contrastText: '#000000',
        },
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
        grey: {
          50: '#2c2c2c',
          100: '#353535',
          200: '#404040',
          300: '#4a4a4a',
          400: '#555555',
          500: '#707070',
          600: '#909090',
          700: '#b0b0b0',
          800: '#d0d0d0',
          900: '#f0f0f0',
        },
      },
    },
  });

  console.log('=== Example 3: Dark Theme ===');
  console.log('Background:', darkTheme.base.palette.background.default);
  console.log('Text color:', darkTheme.base.palette.text.primary);
  
  return darkTheme;
}

// ============================================================================
// Example 4: Compact/Dense Theme
// ============================================================================
export function example4_compactTheme() {
  const compactTheme = createTheme({
    base: {
      spacing: {
        unit: 4,
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
      },
      typography: {
        fontSize: 12,
        fontFamily: "'Roboto', sans-serif",
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

  console.log('=== Example 4: Compact Theme ===');
  console.log('Spacing unit:', compactTheme.base.spacing.unit);
  console.log('Base font size:', compactTheme.base.typography.fontSize);
  
  return compactTheme;
}

// ============================================================================
// Example 5: Generating CSS Variables
// ============================================================================
export function example5_cssVariables() {
  const theme = createTheme({
    base: {
      palette: {
        primary: {
          main: '#ff6b6b',
        },
      },
    },
  });

  const cssVars = getThemeCSSVariables(theme);
  
  console.log('=== Example 5: CSS Variables ===');
  console.log('Generated CSS variables (first 500 chars):');
  console.log(cssVars.substring(0, 500) + '...');
  
  return cssVars;
}

// ============================================================================
// Example 6: Multiple Theme Switching
// ============================================================================
export function example6_themeSystem() {
  const themes = {
    light: defaultTheme,
    dark: example3_darkTheme(),
    brand: example2_customBrandTheme(),
    compact: example4_compactTheme(),
  };

  // Simulate theme switching
  function applyTheme(themeName: keyof typeof themes) {
    const theme = themes[themeName];
    const cssVars = getThemeCSSVariables(theme);
    
    console.log(`=== Applying ${themeName} theme ===`);
    console.log('Primary color:', theme.base.palette.primary.main);
    console.log('Background:', theme.base.palette.background.default);
    
    // In a real app, you would apply these CSS variables to :root
    // const style = document.createElement('style');
    // style.textContent = `:root { ${cssVars} }`;
    // document.head.appendChild(style);
    
    return theme;
  }

  return { themes, applyTheme };
}

// ============================================================================
// Example 7: Component-Specific Overrides
// ============================================================================
export function example7_componentOverrides() {
  const customComponentTheme = createTheme({
    components: {
      button: {
        defaultProps: {
          variant: 'secondary',
          size: 'large',
        },
        styleOverrides: {
          root: 'border-radius: 4px; text-transform: uppercase;',
        },
      },
      card: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      badge: {
        defaultProps: {
          variant: 'success',
        },
      },
    },
  });

  console.log('=== Example 7: Component Overrides ===');
  console.log('Button variant:', customComponentTheme.components.button.defaultProps.variant);
  console.log('Button size:', customComponentTheme.components.button.defaultProps.size);
  console.log('Card variant:', customComponentTheme.components.card.defaultProps.variant);
  
  return customComponentTheme;
}

// ============================================================================
// Example 8: Accessing Theme Values in Components
// ============================================================================
export function example8_usingThemeInComponents() {
  const theme = defaultTheme;
  
  // Example: Building component styles from theme
  const buttonStyles = `
    font-family: ${theme.base.typography.fontFamily};
    background-color: ${theme.base.palette.primary.main};
    color: ${theme.base.palette.primary.contrastText};
    padding: ${theme.base.spacing.sm} ${theme.base.spacing.md};
    border-radius: ${theme.base.borderRadius.full};
    box-shadow: ${theme.base.shadows.sm};
    transition: all ${theme.base.transitions.duration.short}ms ${theme.base.transitions.easing.easeInOut};
  `;

  const cardStyles = `
    background-color: ${theme.base.palette.background.paper};
    border-radius: ${theme.base.borderRadius.md};
    box-shadow: ${theme.base.shadows.md};
    padding: ${theme.base.spacing.lg};
  `;

  console.log('=== Example 8: Using Theme in Components ===');
  console.log('Button styles:', buttonStyles.trim());
  console.log('Card styles:', cardStyles.trim());
  
  return { buttonStyles, cardStyles };
}

// ============================================================================
// Run All Examples (for testing)
// ============================================================================
export function runAllExamples() {
  console.log('\n🎨 Theme System Examples\n');
  
  example1_defaultTheme();
  console.log('\n');
  
  example2_customBrandTheme();
  console.log('\n');
  
  example3_darkTheme();
  console.log('\n');
  
  example4_compactTheme();
  console.log('\n');
  
  example5_cssVariables();
  console.log('\n');
  
  example6_themeSystem();
  console.log('\n');
  
  example7_componentOverrides();
  console.log('\n');
  
  example8_usingThemeInComponents();
  console.log('\n');
  
  console.log('✅ All examples completed!');
}
