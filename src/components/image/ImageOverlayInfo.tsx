import { Box, createStyles, Group, Space, Text, Title, UnstyledButton } from '@mantine/core';
import { IconDownload, IconEdit, IconTrash } from '@tabler/icons';

import type { ImageCardProps } from './ImageOverlay';

export function ImageOverlayInfo(props: ImageCardProps) {
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
        <Title order={2}>Information</Title>
        <Space h='lg' />
        <Text className={classes.infoHeader}>Title</Text>
        <Text className={classes.infoText}>{props.caption}</Text>
        <Space h='xs' />
        <Text className={classes.infoHeader}>Date</Text>
        <Text className={classes.infoText}>August</Text>
        <Space h='xs' />
        <Text className={classes.infoHeader}>Location</Text>
        <Text className={classes.infoText}>Here</Text>
      </div>
      <div className={classes.buttonGroup}>
        <UnstyledButton className={classes.button}>
          <Group spacing={5}>
            <IconEdit />
            <Text>Edit</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group className={classes.delete} spacing={5}>
            <IconTrash />
            <Text>Delete</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group spacing={5}>
            <IconDownload />
            <Text>Download</Text>
          </Group>
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
