import type { MantineThemeOverride } from '@mantine/core';

/**
 * App-global component props and style overrides
 */
const appTheme: MantineThemeOverride = {
  primaryColor: 'indigo',
  components: {
    Paper: {
      defaultProps: { p: 'sm', shadow: 'xl', withBorder: true },
    },
    ThemeIcon: {
      styles: theme => ({
        root: {
          boxShadow: theme.shadows.md,
        },
      }),
    },
    Badge: {
      defaultProps: {
        radius: 'xs',
        variant: 'filled',
      },
    },
    Pagination: {
      styles: {
        item: {
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
    },
    Button: {
      styles: theme => ({
        root: {
          boxShadow: theme.shadows.md,
        },
      }),
    },
  },
  fontFamily:
    'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  headings: {
    fontFamily:
      'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  },
};

export { appTheme };
