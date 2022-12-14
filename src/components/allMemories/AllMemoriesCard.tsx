import { Anchor, Badge, Card, createStyles, Group, Image, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';

import type { memoryCardT } from '~types/memoryT';

export function AllMemoriesCard({
  _id,
  title,
  description,
  firstDate,
  lastDate,
  photoPreviewUrl,
  photos,
  collections,
}: memoryCardT) {
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
        {photoPreviewUrl ? (
          <Link href={`/memories/${_id}`} passHref>
            <a>
              <Image
                alt={title}
                fit='cover'
                height={180}
                placeholder={<Text align='center'>No photos</Text>}
                src={photoPreviewUrl}
              />
            </a>
          </Link>
        ) : (
          <Image
            alt='Placeholder'
            fit='cover'
            height={180}
            placeholder={<Text align='center'>No photos</Text>}
            withPlaceholder
          />
        )}
      </Card.Section>
      <Space h='xs' />
      <Title className={classes.text} lineClamp={2} order={3} weight={600}>
        <Link href={`/memories/${_id}`} passHref>
          <Text component='a' inherit>
            {title}
          </Text>
        </Link>
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
      <Link href={`/memories/${_id}`} passHref>
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
