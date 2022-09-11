import { Carousel } from '@mantine/carousel';
import { Anchor, Badge, Box, Card, Grid, Image, ScrollArea, Space, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

import type { memoryCardT } from '~types/memory/memoryForm';

/**
 * collections and photos will be list array which we can change when actually passing in
 * the objects, unsure about if we will pass the date as string in the prop or convert to
 * string within the component, just keeping it like this for now, will pass in the url
 * of the image as well when it comes to it, instead of using unsplash
 */
// interface Collection {
//   collectionId: string;
// }

// interface Photo {
//   photoId: string;
// }

type TimelineCardProps = memoryCardT;

export function TimelineCard(props: TimelineCardProps) {
  const [indicator, setIndicator] = useState(false);
  const collectionBadges = props.collections?.map(c => (
    <Grid.Col key={c.collectionTitle} span={3}>
      <Badge color={c.collectionColor} radius='sm' size='xs' variant='filled'>
        <Text>{c.collectionTitle}</Text>
      </Badge>
    </Grid.Col>
  ));

  // preview n photos in carousel
  // const n = 3;
  // const photoPreview = props.photos?.slice(0, n).map(c => (
  //   <Carousel.Slide key={c._id}>
  //     <Image alt={c.caption} height={180} src={c.url} />
  //   </Carousel.Slide>
  // ));
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
        maxHeight: 500,
      })}
      withBorder
    >
      <Card.Section>
        <Carousel
          align='center'
          height={180}
          mx='auto'
          onMouseEnter={() => setIndicator(true)}
          onMouseLeave={() => setIndicator(false)}
          sx={{ maxWidth: 300, transition: 'indicator 1s, control 1s' }}
          withControls={indicator}
          withIndicators={indicator}
        >
          <Carousel.Slide>
            <Image
              alt={props.title}
              height={180}
              src={
                props.photoPreviewUrl ||
                'https://firebasestorage.googleapis.com/v0/b/register-app-40207.appspot.com/o/wlDYrCXpN7ewycECJTQJiLHtE4e2%2FDdrGVSwaHggCoqsN-Guy7%2Fno-image.png?alt=media&token=19761ace-69f8-495f-b390-155d5de7d5a1'
              }
            />
          </Carousel.Slide>
        </Carousel>
      </Card.Section>
      <Text mt='sm' size='xl' weight={600}>
        {props.title}
      </Text>

      <Text color='dimmed' mb='xs' size='xs' weight={600}>
        {props.firstDate.toDateString()}
      </Text>

      <ScrollArea style={{ height: 100 }}>
        <Text color='light' size='sm'>
          {props.description}
        </Text>
      </ScrollArea>
      <Space h='md' />
      <Grid gutter='xs' mb='xs'>
        {/* {props.collections &&
          props.collections.map(c => TimelineTag({ collectionId: c.collectionId }))} */}
        {collectionBadges}
      </Grid>
      <Link href={'memory/' + props._id}>
        <Anchor sx={{ fontSize: 14, fontWeight: 600 }}>
          View 0 photos
          {/* View {props.photos?.length || 0} photos */}
        </Anchor>
      </Link>
    </Card>
  );
}
