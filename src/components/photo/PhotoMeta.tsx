import { Box, createStyles, Space, Text, Title } from '@mantine/core';

import { MapBox } from '~components/util/MapBox';

interface ImageCardProps {
  caption?: string;
  url: string;
  location?: string;
}

export function PhotoMeta(props: ImageCardProps) {
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
      <Text className={classes.infoText} italic={!props.caption}>
        {props.caption}
      </Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Photo Date</Text>
      <Text className={classes.infoText}>Insert Date</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Size</Text>
      <Text className={classes.infoText}>1920x1080</Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Location</Text>
      <Text className={classes.infoText}>{props.location}</Text>
      <Space h='xs' />
      {props.location && <MapBox locQuery={props.location} />}
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
