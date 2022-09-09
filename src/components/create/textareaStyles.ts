import { createStyles } from '@mantine/core';

export const useTextareaStyles = createStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 1,
    paddingTop: 1,
    flexGrow: 1,
  },
  wrapper: { display: 'flex', flexGrow: 1 },
  input: { flexGrow: 1 },
  description: { paddingTop: 1 },
});
