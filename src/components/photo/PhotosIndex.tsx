import { ActionIcon, Container, Grid, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { PhotoModal } from '~components/photo/PhotoModal';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import type { photoWithMemoryT } from '~types/photo/photo';

import { PhotoCard } from './PhotoCard';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function PhotosIndex() {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['images.listImages']);

  const router = useRouter();
  const id = router.query.id;

  if (Array.isArray(id)) {
    void router.replace('/images', undefined, { shallow: true });
  }

  const photoMap: Map<string, number> = useMemo(
    () => new Map(data?.photos ? data.photos.map((p, i) => [p._id, i]) : []),
    [data?.photos],
  );

  let contents;
  if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading photos. Try again later.</Text>;
  } else {
    contents = (
      <Grid>
        {data.photos.map(p => (
          <Grid.Col key={p._id} md={3} sm={4} xs={6}>
            <PhotoCard {...p} />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  const photoIndex: number | undefined = typeof id === 'string' ? photoMap.get(id) : undefined;
  const photoAtIndex: photoWithMemoryT | undefined =
    photoIndex === undefined ? undefined : data?.photos.at(photoIndex);

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <Stack spacing='sm'>
          <Title>Your photos</Title>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            placeholder='Search your photos by caption'
            rightSection={
              <ActionIcon color='indigo' size={32} variant='filled'>
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
            rightSectionWidth={42}
            size='md'
          />
        </Stack>
        <Space h='xl' />
        {contents}
        <Space h='xl' />
      </Container>
      {photoAtIndex && <PhotoModal {...photoAtIndex} />}
    </>
  );
}
