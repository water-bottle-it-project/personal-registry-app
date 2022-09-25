import { ActionIcon, Container, Grid, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';

import { trpcClient } from '~clientUtils/trpcClient';
import { PhotoGallery } from '~components/photo/PhotoGallery';
import { PhotoSearch } from '~components/photo/PhotoSearch';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function PhotosIndex() {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['photos.GetPhotos']);

  let contents;
  if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading photos. Try again later.</Text>;
  } else {
    contents = (
      <Grid>
        <PhotoGallery photos={data.photos} />
      </Grid>
    );
  }

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <PhotoSearch />
        <Space h='xl' />
        {contents}
        <Space h='xl' />
      </Container>
    </>
  );
}
