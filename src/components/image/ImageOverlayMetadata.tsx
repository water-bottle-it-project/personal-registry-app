import { Box, createStyles, Space, Text, Title } from '@mantine/core';

import type { ImageCardProps } from './ImageOverlay';

export function ImageOverlayMetadata(props: ImageCardProps) {
  const { classes } = useStyles();
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
        borderRadius: theme.radius.xs,
        padding: theme.spacing.xl,
      })}
    >
      <Title order={2}>Metadata</Title>
      <Space h='lg' />
      <Text className={classes.infoHeader}>Filename</Text>
      <Text className={classes.infoText}>{props.caption}</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Date Taken</Text>
      <Text className={classes.infoText}>August</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Device</Text>
      <Text className={classes.infoText}>Here</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Size</Text>
      <Text className={classes.infoText}>1920x1080</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Aperture</Text>
      <Text className={classes.infoText}>f/2.2</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Exposure</Text>
      <Text className={classes.infoText}>1/60s</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Location</Text>
      <Text className={classes.infoText}>Melbourne</Text>
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
}));
