import { createStyles, TextInput } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';

const useStyles = createStyles(theme => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}));

export function InputValidation() {
  const { classes } = useStyles();
  return (
    <TextInput
      classNames={{ input: classes.invalid }}
      defaultValue='user@domain.com'
      error='Invalid email! Try Again...'
      label='Input New Email'
      rightSection={<IconAlertTriangle className={classes.icon} size={16} stroke={1.5} />}
    />
  );
}
