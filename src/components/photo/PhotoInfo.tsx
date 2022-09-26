import { Box, createStyles, Space, Text, Title, UnstyledButton } from '@mantine/core';
import { IconDownload } from '@tabler/icons';

import type { photoWithIdT } from '~types/photo/photo';

export function PhotoInfo(props: photoWithIdT) {
  const { classes } = useStyles();
  return (
    <Box
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
        borderRadius: theme.radius.xs,
        padding: theme.spacing.xl,
      })}
    >
      <div>
        <Title italic={!props.caption} order={2}>
          {props.caption || 'no caption provided'}
        </Title>
        <Space h='lg' />
        {props.photoDate && (
          <>
            <Text className={classes.infoHeader}>Photo Date</Text>
            <Text className={classes.infoText}>{new Date(props.photoDate).toDateString()}</Text>
          </>
        )}
        <Space h='xs' />
        <Text className={classes.infoHeader}>Date</Text>
        <Text className={classes.infoText} italic={!props.photoDate?.toString()}>
          {props.photoDate?.toString() || 'no date'}
        </Text>
        <Space h='xs' />
        <Text className={classes.infoHeader}>Location</Text>
        <Text className={classes.infoText} italic={!props.location}>
          {props.location || 'no location'}
        </Text>
      </div>
      <Space h='md' />
      <div className={classes.buttonGroup}>
        <UnstyledButton className={classes.button}>
          <IconDownload />
        </UnstyledButton>
      </div>
    </Box>
  );
}

const useStyles = createStyles(theme => ({
  infoHeader: {
    fontWeight: 600,
    fontSize: theme.fontSizes.lg,
  },
  infoText: {
    fontWeight: 400,
    fontSize: theme.fontSizes.md,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  button: {
    margin: '0 10px',
  },
  delete: {
    color: theme.colors.red,
  },
}));
