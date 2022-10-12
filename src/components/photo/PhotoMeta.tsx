import { Badge, Card, createStyles, Space, Text } from '@mantine/core';

import { MapBox } from '~components/util/MapBox';

interface PhotoMetaProps {
  caption?: string;
  url: string;
  location?: string;
  photoDate: Date | null;
  width: number;
  height: number;
  index: number;
  total: number;
}

export function PhotoMeta(props: PhotoMetaProps) {
  const { classes } = useStyles();
  return (
    <Card
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        borderRadius: theme.radius.xs,
        padding: theme.spacing.xl,
      })}
    >
      <Badge radius='md' size='lg' variant='dot'>{`${props.index + 1}/${props.total}`}</Badge>
      <Space h='lg' />
      <Text className={classes.infoHeader}>Caption</Text>
      <Text
        className={classes.infoText}
        color={props.caption ? undefined : 'dimmed'}
        italic={!props.caption}
      >
        {props.caption || 'No caption provided'}
      </Text>
      <Space h='xs' />
      <Text className={classes.infoHeader}>Photo Date</Text>
      {props.photoDate ? (
        <Text className={classes.infoText}>{new Date(props.photoDate).toDateString()}</Text>
      ) : (
        <Text className={classes.infoText} color={props.photoDate ? undefined : 'dimmed'} italic>
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
      <Text
        className={classes.infoText}
        color={props.location ? undefined : 'dimmed'}
        italic={!props.location}
      >
        {props.location || 'No location provided'}
      </Text>
      <Space h='xs' />
      <Card.Section>{props.location && <MapBox locQuery={props.location} />}</Card.Section>
    </Card>
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
