/**
 * Base Theme Tier
 * Foundational design tokens that define the core visual language
 */

export interface Palette {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  grey: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
  };
  divider: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  h5: TypographyStyle;
  h6: TypographyStyle;
  subtitle1: TypographyStyle;
  subtitle2: TypographyStyle;
  body1: TypographyStyle;
  body2: TypographyStyle;
  button: TypographyStyle;
  caption: TypographyStyle;
  overline: TypographyStyle;
}

export interface TypographyStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
}

export interface Spacing {
  unit: number;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface Shadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface BorderRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Transitions {
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
  };
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
}

export interface ZIndex {
  mobileStepper: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

/**
 * Base Theme Interface
 */
export interface BaseTheme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  borderRadius: BorderRadius;
  breakpoints: Breakpoints;
  transitions: Transitions;
  zIndex: ZIndex;
}

/**
 * Default Base Theme
 */
export const defaultBaseTheme: BaseTheme = {
  palette: {
    primary: {
      main: '#1ea7fd',
      light: '#5ec2ff',
      dark: '#0077c2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff4444',
      light: '#ff7777',
      dark: '#cc0000',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffa726',
      light: '#ffd95b',
      dark: '#c77800',
      contrastText: '#000000',
    },
    info: {
      main: '#29b6f6',
      light: '#73e8ff',
      dark: '#0086c3',
      contrastText: '#000000',
    },
    success: {
      main: '#66bb6a',
      light: '#98ee99',
      dark: '#338a3e',
      contrastText: '#000000',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#9e9e9e',
    },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
    },
  },
  spacing: {
    unit: 8,
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.25)',
  },
  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};
