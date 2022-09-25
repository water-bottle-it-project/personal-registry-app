import { ActionIcon, Container, Grid, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { PhotoGallery } from '~components/photo/PhotoGallery';
import { PhotoSearch } from '~components/photo/PhotoSearch';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

import { PhotoSearchResult } from './PhotoSearchResult';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function PhotosIndex() {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['photos.GetPhotos']);

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  console.log(searchText);

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <PhotoSearch setSearchText={setSearchText} />
        <Space h='xl' />
        {searchText ? <PhotoSearchResult searchText={searchText} /> : contents}
        <Space h='xl' />
      </Container>
    </>
  );
}
