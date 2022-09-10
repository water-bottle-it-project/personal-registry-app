import { Anchor, Card, Grid, Image, Text } from '@mantine/core';
import Link from 'next/link';

import { TimelineTag } from '~components/timeline/TimelineTag';

/**
 * collections and photos will be list array which we can change when actually passing in
 * the objects, unsure about if we will pass the date as string in the prop or convert to
 * string within the component, just keeping it like this for now, will pass in the url
 * of the image as well when it comes to it, instead of using unsplash
 */
interface Collection {
  collectionId: string;
}

interface Photo {
  photoId: string;
}

interface TimelineCardProps {
  _id: string;
  title: string;
  description: string;
  firstDate: Date;
  lastDate: Date;
  collections: Array<Collection>;
  photos: Array<Photo>;
}

export function TimelineCard(props: TimelineCardProps) {
  return (
    <Card
      p='lg'
      radius='sm'
      shadow='sm'
      sx={theme => ({
        // subscribe to color scheme changes
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        // or use any other static values from theme
        fontSize: theme.fontSizes.sm,
        width: 275,
      })}
      withBorder
    >
      <Card.Section>
        <Image
          alt='Norway'
          height={180}
          src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
        />
      </Card.Section>

      <Text mt='sm' size='xl' weight={600}>
        {props.title}
      </Text>

      <Text color='dimmed' mb='xs' size='xs' weight={600}>
        {props.firstDate.toDateString()}
      </Text>

      <Text color='light' size='sm'>
        {props.description}
      </Text>

      <Grid mb='xs' mt='lg'>
        {props.collections.map(c => TimelineTag({ collectionId: c.collectionId }))}
      </Grid>
      <Link href={'memory/' + props._id}>
        <Anchor sx={{ fontSize: 14, fontWeight: 600 }}>View {props.photos.length} photos</Anchor>
      </Link>
    </Card>
  );
}
