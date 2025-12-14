/**
 * Component Theme Tier
 * Component-specific styling configurations that build upon base theme
 */

import type { BaseTheme } from './base.js';

/**
 * Button Component Theme
 */
export interface ButtonTheme {
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
}

/**
 * Input Field Component Theme
 */
export interface InputFieldTheme {
  defaultProps: {
    variant: 'outlined' | 'filled';
  };
  styleOverrides: {
    root: string;
    label: string;
    input: string;
    helperText: string;
    error: string;
  };
}

/**
 * Card Component Theme
 */
export interface CardTheme {
  defaultProps: {
    variant: 'elevation' | 'outlined';
  };
  styleOverrides: {
    root: string;
    header: string;
    content: string;
    footer: string;
  };
}

/**
 * Badge Component Theme
 */
export interface BadgeTheme {
  defaultProps: {
    variant: 'default' | 'success' | 'error' | 'warning' | 'info';
  };
  styleOverrides: {
    root: string;
    default: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

/**
 * Alert Component Theme
 */
export interface AlertTheme {
  defaultProps: {
    severity: 'info' | 'success' | 'warning' | 'error';
  };
  styleOverrides: {
    root: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
}

/**
 * Modal Component Theme
 */
export interface ModalTheme {
  defaultProps: {
    closeOnBackdrop: boolean;
  };
  styleOverrides: {
    backdrop: string;
    modal: string;
    header: string;
    content: string;
    footer: string;
  };
}

/**
 * Chip Component Theme
 */
export interface ChipTheme {
  defaultProps: {
    variant: 'filled' | 'outlined';
    size: 'small' | 'medium';
  };
  styleOverrides: {
    root: string;
    filled: string;
    outlined: string;
    small: string;
    medium: string;
  };
}

/**
 * Complete Component Theme Interface
 */
export interface ComponentTheme {
  button: ButtonTheme;
  inputField: InputFieldTheme;
  card: CardTheme;
  badge: BadgeTheme;
  alert: AlertTheme;
  modal: ModalTheme;
  chip: ChipTheme;
}

/**
 * Helper function to generate component theme from base theme
 */
export function createComponentTheme(baseTheme: BaseTheme): ComponentTheme {
  return {
    button: {
      defaultProps: {
        variant: 'primary',
        size: 'medium',
      },
      styleOverrides: {
        root: `
          font-family: ${baseTheme.typography.fontFamily};
          font-weight: ${baseTheme.typography.fontWeightBold};
          border: 0;
          cursor: pointer;
          display: inline-block;
          line-height: 1;
          transition: all ${baseTheme.transitions.duration.short}ms ${baseTheme.transitions.easing.easeInOut};
          border-radius: ${baseTheme.borderRadius.full};
        `,
        primary: `
          color: ${baseTheme.palette.primary.contrastText};
          background-color: ${baseTheme.palette.primary.main};
        `,
        secondary: `
          color: ${baseTheme.palette.text.primary};
          background-color: transparent;
          box-shadow: ${baseTheme.palette.grey[400]} 0px 0px 0px 1px inset;
        `,
        small: `
          font-size: 12px;
          padding: 10px 16px;
        `,
        medium: `
          font-size: 14px;
          padding: 11px 20px;
        `,
        large: `
          font-size: 16px;
          padding: 12px 24px;
        `,
      },
    },
    inputField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: `
          font-family: ${baseTheme.typography.fontFamily};
        `,
        label: `
          font-size: ${baseTheme.typography.body2.fontSize};
          font-weight: ${baseTheme.typography.fontWeightMedium};
          color: ${baseTheme.palette.text.primary};
        `,
        input: `
          font-family: ${baseTheme.typography.fontFamily};
          font-size: ${baseTheme.typography.body1.fontSize};
          padding: ${baseTheme.spacing.sm} ${baseTheme.spacing.md};
          border: 1px solid ${baseTheme.palette.grey[300]};
          border-radius: ${baseTheme.borderRadius.sm};
          outline: none;
          transition: border-color ${baseTheme.transitions.duration.short}ms;
        `,
        helperText: `
          font-size: ${baseTheme.typography.caption.fontSize};
          color: ${baseTheme.palette.text.secondary};
        `,
        error: `
          border-color: ${baseTheme.palette.error.main};
          color: ${baseTheme.palette.error.main};
        `,
      },
    },
    card: {
      defaultProps: {
        variant: 'elevation',
      },
      styleOverrides: {
        root: `
          font-family: ${baseTheme.typography.fontFamily};
          border-radius: ${baseTheme.borderRadius.md};
          background-color: ${baseTheme.palette.background.default};
          box-shadow: ${baseTheme.shadows.sm};
        `,
        header: `
          padding: ${baseTheme.spacing.md};
          border-bottom: 1px solid ${baseTheme.palette.divider};
          font-weight: ${baseTheme.typography.fontWeightMedium};
          font-size: ${baseTheme.typography.h6.fontSize};
        `,
        content: `
          padding: ${baseTheme.spacing.md};
        `,
        footer: `
          padding: ${baseTheme.spacing.md};
          border-top: 1px solid ${baseTheme.palette.divider};
          background-color: ${baseTheme.palette.background.paper};
        `,
      },
    },
    badge: {
      defaultProps: {
        variant: 'default',
      },
      styleOverrides: {
        root: `
          font-family: ${baseTheme.typography.fontFamily};
          font-size: ${baseTheme.typography.caption.fontSize};
          font-weight: ${baseTheme.typography.fontWeightMedium};
          padding: ${baseTheme.spacing.xs} ${baseTheme.spacing.sm};
          border-radius: ${baseTheme.borderRadius.full};
          display: inline-block;
        `,
        default: `
          background-color: ${baseTheme.palette.grey[300]};
          color: ${baseTheme.palette.text.primary};
        `,
        success: `
          background-color: ${baseTheme.palette.success.main};
          color: ${baseTheme.palette.success.contrastText};
        `,
        error: `
          background-color: ${baseTheme.palette.error.main};
          color: ${baseTheme.palette.error.contrastText};
        `,
        warning: `
          background-color: ${baseTheme.palette.warning.main};
          color: ${baseTheme.palette.warning.contrastText};
        `,
        info: `
          background-color: ${baseTheme.palette.info.main};
          color: ${baseTheme.palette.info.contrastText};
        `,
      },
    },
    alert: {
      defaultProps: {
        severity: 'info',
      },
      styleOverrides: {
        root: `
          font-family: ${baseTheme.typography.fontFamily};
          padding: ${baseTheme.spacing.md};
          border-radius: ${baseTheme.borderRadius.sm};
          border-left: 4px solid;
        `,
        info: `
          background-color: ${baseTheme.palette.info.light}33;
          border-left-color: ${baseTheme.palette.info.main};
          color: ${baseTheme.palette.info.dark};
        `,
        success: `
          background-color: ${baseTheme.palette.success.light}33;
          border-left-color: ${baseTheme.palette.success.main};
          color: ${baseTheme.palette.success.dark};
        `,
        warning: `
          background-color: ${baseTheme.palette.warning.light}33;
          border-left-color: ${baseTheme.palette.warning.main};
          color: ${baseTheme.palette.warning.dark};
        `,
        error: `
          background-color: ${baseTheme.palette.error.light}33;
          border-left-color: ${baseTheme.palette.error.main};
          color: ${baseTheme.palette.error.dark};
        `,
      },
    },
    modal: {
      defaultProps: {
        closeOnBackdrop: true,
      },
      styleOverrides: {
        backdrop: `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: ${baseTheme.zIndex.modal};
        `,
        modal: `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: ${baseTheme.palette.background.default};
          border-radius: ${baseTheme.borderRadius.md};
          box-shadow: ${baseTheme.shadows.xl};
          z-index: ${baseTheme.zIndex.modal + 1};
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        `,
        header: `
          padding: ${baseTheme.spacing.lg};
          border-bottom: 1px solid ${baseTheme.palette.divider};
          font-size: ${baseTheme.typography.h5.fontSize};
          font-weight: ${baseTheme.typography.fontWeightMedium};
        `,
        content: `
          padding: ${baseTheme.spacing.lg};
        `,
        footer: `
          padding: ${baseTheme.spacing.lg};
          border-top: 1px solid ${baseTheme.palette.divider};
          background-color: ${baseTheme.palette.background.paper};
        `,
      },
    },
    chip: {
      defaultProps: {
        variant: 'filled',
        size: 'medium',
      },
      styleOverrides: {
        root: `
          font-family: ${baseTheme.typography.fontFamily};
          display: inline-flex;
          align-items: center;
          border-radius: ${baseTheme.borderRadius.full};
          font-weight: ${baseTheme.typography.fontWeightMedium};
        `,
        filled: `
          background-color: ${baseTheme.palette.grey[300]};
          color: ${baseTheme.palette.text.primary};
        `,
        outlined: `
          background-color: transparent;
          border: 1px solid ${baseTheme.palette.grey[400]};
          color: ${baseTheme.palette.text.primary};
        `,
        small: `
          font-size: ${baseTheme.typography.caption.fontSize};
          padding: ${baseTheme.spacing.xs} ${baseTheme.spacing.sm};
          height: 24px;
        `,
        medium: `
          font-size: ${baseTheme.typography.body2.fontSize};
          padding: ${baseTheme.spacing.xs} ${baseTheme.spacing.md};
          height: 32px;
        `,
      },
    },
  };
}

/**
 * Default component theme
 */
export const defaultComponentTheme: ComponentTheme = {
  button: {
    defaultProps: {
      variant: 'primary',
      size: 'medium',
    },
    styleOverrides: {
      root: '',
      primary: '',
      secondary: '',
      small: '',
      medium: '',
      large: '',
    },
  },
  inputField: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: '',
      label: '',
      input: '',
      helperText: '',
      error: '',
    },
  },
  card: {
    defaultProps: {
      variant: 'elevation',
    },
    styleOverrides: {
      root: '',
      header: '',
      content: '',
      footer: '',
    },
  },
  badge: {
    defaultProps: {
      variant: 'default',
    },
    styleOverrides: {
      root: '',
      default: '',
      success: '',
      error: '',
      warning: '',
      info: '',
    },
  },
  alert: {
    defaultProps: {
      severity: 'info',
    },
    styleOverrides: {
      root: '',
      info: '',
      success: '',
      warning: '',
      error: '',
    },
  },
  modal: {
    defaultProps: {
      closeOnBackdrop: true,
    },
    styleOverrides: {
      backdrop: '',
      modal: '',
      header: '',
      content: '',
      footer: '',
    },
  },
  chip: {
    defaultProps: {
      variant: 'filled',
      size: 'medium',
    },
    styleOverrides: {
      root: '',
      filled: '',
      outlined: '',
      small: '',
      medium: '',
    },
  },
};
