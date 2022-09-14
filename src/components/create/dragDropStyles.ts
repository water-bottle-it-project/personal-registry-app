import { createStyles } from '@mantine/core';

export const useDragDropStyles = createStyles(theme => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.xs}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    marginBottom: theme.spacing.lg,
    boxShadow: theme.shadows.xs,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingRight: 0,
  },

  helpText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.dark[3],
    fontSize: theme.fontSizes.sm,
  },
}));
