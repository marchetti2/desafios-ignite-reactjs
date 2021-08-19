export default {
  baseStyle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'light.400',
  },
  variants: {
    'default-36px': {
      fontSize: ['xl', '4xl', '4xl', '4xl'],
      lineHeight: ['1.875rem', '3.375rem', '3.375rem', '3.375rem'],
    },
    'bold-48px': {
      fontWeight: '700',
      fontSize: ['1.75rem', '5xl', '5xl', '5xl'],
      lineHeight: ['2.625rem', '4.5rem', '4.5rem', '4.5rem'],
    },
    'semibold-48px': {
      fontWeight: '600',
      fontSize: ['1.75rem', '5xl', '5xl', '5xl'],
      lineHeight: ['2.625rem', '74.5rem', '4.5rem', '4.5rem'],
    },
    'semibold-20px-dark.400-barlow': {
      fontFamily: 'Barlow',
      fontWeight: '600',
      fontSize: 'xl',
      lineHeight: '1.5rem',
      color: 'dark.400',
    },
  },
  defaultProps: {
    variant: 'default-36px',
  },
};
