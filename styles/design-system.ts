export const colors = {
  primary: {
    blue: '#0066FF', // Main action color from UI
    darkBlue: '#001F4D',
    lightBlue: '#E5F0FF',
  },
  secondary: {
    purple: '#6B46C1', // Used in giveaway/game sections
    pink: '#E53E3E',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  }
}

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif', // Main font from UI
    display: 'Inter, system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
}

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
}

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
}

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
}

// Component specific tokens
export const components = {
  card: {
    background: colors.neutral.white,
    border: colors.neutral.gray[200],
    radius: borderRadius.lg,
    shadow: shadows.md,
  },
  button: {
    primary: {
      background: colors.primary.blue,
      text: colors.neutral.white,
      hover: colors.primary.darkBlue,
    },
    secondary: {
      background: colors.neutral.white,
      text: colors.primary.blue,
      border: colors.primary.blue,
      hover: colors.primary.lightBlue,
    }
  },
  input: {
    background: colors.neutral.white,
    border: colors.neutral.gray[200],
    focus: colors.primary.blue,
    text: colors.neutral.gray[900],
    placeholder: colors.neutral.gray[400],
  }
}
