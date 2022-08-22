import type { MantineThemeOverride } from '@mantine/core';

/**
 * App-global component props and style overrides
 */
const appTheme: MantineThemeOverride = {
  primaryColor: 'indigo',
  components: {
    Paper: {
      defaultProps: { p: 'md', pt: 2, shadow: 'xl', withBorder: true },
    },
    ActionIcon: {
      styles: theme => ({
        root: {
          boxShadow: theme.shadows.md,
        },
      }),
    },
    ThemeIcon: {
      styles: theme => ({
        root: {
          boxShadow: theme.shadows.md,
        },
      }),
    },
    Button: {
      styles: theme => ({
        root: {
          boxShadow: theme.shadows.md,
        },
      }),
    },
  },
};

export { appTheme };
