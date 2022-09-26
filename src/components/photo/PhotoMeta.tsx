import { Box, createStyles, Space, Text, Title } from '@mantine/core';

import { MapBox } from '~components/util/MapBox';

interface PhotoMetaProps {
  caption?: string;
  url: string;
  location?: string;
  photoDate: Date | null;
  width: number;
  height: number;
}

export function PhotoMeta(props: PhotoMetaProps) {
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
      <Text className={classes.infoHeader}>Caption</Text>
      <Text className={classes.infoText} italic={!props.caption}>
        {props.caption || 'No caption provided'}
      </Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Photo Date</Text>
      {props.photoDate ? (
        <Text className={classes.infoText}>{new Date(props.photoDate).toDateString()}</Text>
      ) : (
        <Text className={classes.infoText} italic>
          No date provided
        </Text>
      )}
      <Space h='xs' />
      <Text className={classes.infoHeader}>Resolution</Text>
      <Text className={classes.infoText}>
        {props.width} x {props.height}
      </Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Location</Text>
      <Text className={classes.infoText} italic={!props.location}>
        {props.location || 'No location provided'}
      </Text>
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
