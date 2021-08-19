export default {
  baseStyle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    color: 'light.300',
  },
  variants: {
    'default-20px': {
      fontSize: ['sm', 'xl', 'xl', 'xl'],
      lineHeight: ['1.312rem', '1.875rem', '1.875rem', '1.875rem'],
    },
    'regular-24px-dark.400': {
      fontSize: ['sm', '2xl', '2xl', '2xl'],
      lineHeight: ['1.31rem', '2.25rem', '2.25rem', '2.25rem'],
      color: 'dark.400',
    },
    'bold-24px-light.300': {
      fontWeight: '700',
      fontSize: ['sm', '2xl', '2xl', '2xl'],
      lineHeight: ['1.31rem', '2.25rem', '2.25rem', '2.25rem'],
      color: 'light.300',
    },
    'semibold-24px-dark.400': {
      fontWeight: ['500', '600', '600', '600'],
      fontSize: ['1.125rem', '1.5rem', '1.5rem', '1.5rem'],
      lineHeight: ['100%', '100%', '100%', '100%'],
      color: 'dark.400',
    },
    'regular-36px-dark.400': {
      fontWeight: '500',
      fontSize: ['2xl', '4xl', '4xl', '4xl'],
      lineHeight: ['2.25rem', '3.375rem', '3.375rem', '3.375rem'],
      color: 'dark.400',
    },
    'semibold-48px-highlight': {
      fontWeight: '600',
      fontSize: ['1.5rem', '5xl', '5xl', '5xl'],
      lineHeight: ['100%', '100%', '100%', '100%'],
      color: 'highlight.500',
    },
    'regular-16px-dark.300-barlow': {
      fontFamily: 'Barlow',
      fontWeight: '500',
      fontSize: 'md',
      lineHeight: '1.5rem',
      color: 'dark.300',
    },
  },
  defaultProps: {
    variant: 'default-20px',
  },
};
