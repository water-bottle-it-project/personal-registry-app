import { Carousel } from '@mantine/carousel';
import { Anchor, Card, createStyles, Image, Space, Text } from '@mantine/core';
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
      <Space h='md' />
      <Text className={classes.text} lineClamp={2} size='xl' weight={600}>
        {title}
      </Text>

      <Text color='dimmed' size='xs' weight={600}>
        {firstDate === lastDate
          ? new Date(lastDate).toDateString()
          : `${new Date(firstDate).toDateString()} - ${new Date(lastDate).toDateString()}`}
      </Text>
      <Space h='sm' />
      <Text className={classes.text} color='light' italic={!description} lineClamp={6} size='sm'>
        {description || 'no description provided'}
      </Text>
      <Space h='sm' />

      {/* Use mt='auto' to push link to bottom of card */}
      <Link href={`/memory/${_id}`} passHref>
        <Anchor component='a' mt='auto' sx={{ fontSize: 14, fontWeight: 600 }}>
          {`View ${photos.length} photo${photos.length === 1 ? '' : 's'}`}
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
