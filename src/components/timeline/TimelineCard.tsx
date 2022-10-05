import { Carousel } from '@mantine/carousel';
import { Anchor, Badge, Card, createStyles, Group, Image, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

import type { memoryCardT } from '~types/memory/memoryForm';

export function TimelineCard({
  _id,
  title,
  description,
  firstDate,
  lastDate,
  photoPreviewUrl,
  photos,
  collections,
}: memoryCardT) {
  const [indicator, setIndicator] = useState(false);

  const { classes } = useStyles();
  return (
    <Card
      radius='sm'
      shadow='sm'
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
          sx={{ transition: 'indicator 1s, control 1s' }}
          withControls={indicator}
          withIndicators={indicator}
        >
          <Carousel.Slide>
            <Image
              alt={title}
              fit='cover'
              height={180}
              placeholder={<Text align='center'>No photos</Text>}
              src={photoPreviewUrl}
              withPlaceholder
            />
          </Carousel.Slide>
        </Carousel>
      </Card.Section>
      <Space h='xs' />
      <Title className={classes.text} lineClamp={2} order={3} weight={600}>
        {title}
      </Title>

      <Text color='dimmed' size='xs' weight={600}>
        {firstDate === lastDate
          ? new Date(lastDate).toDateString()
          : `${new Date(firstDate).toDateString()} - ${new Date(lastDate).toDateString()}`}
      </Text>
      <Space h='xs' />

      <Group spacing='xs'>
        {collections.map(c => (
          <Badge color={c.color} key={c._id}>
            <Link href={`/collections/${c._id}`} passHref>
              <Anchor component='a' variant='text'>
                {c.title}
              </Anchor>
            </Link>
          </Badge>
        ))}
      </Group>
      <Space h='xs' />

      <Text className={classes.text} color='light' italic={!description} lineClamp={6} size='sm'>
        {description || 'no description provided'}
      </Text>
      <Space h='sm' />

      {/* Use mt='auto' to push link to bottom of card */}
      <Link href={`/memory/${_id}`} passHref>
        <Anchor component='a' mt='auto' sx={{ fontSize: 14, fontWeight: 600 }}>
          {photos.length
            ? `View ${photos.length} photo${photos.length === 1 ? '' : 's'}`
            : 'View memory details'}
        </Anchor>
      </Link>
    </Card>
  );
}

const useStyles = createStyles({
  text: {
    overflowWrap: 'break-word',
  },
});
