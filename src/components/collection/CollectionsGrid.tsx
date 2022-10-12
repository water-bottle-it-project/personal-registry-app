import { Grid, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionCard } from '~components/collection/CollectionCard';
import { CollectionSearchResult } from '~components/collection/CollectionSearchResult';
import { CollectionsHeader } from '~components/collection/CollectionsHeader';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

export function CollectionsGrid() {
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'collection.GetCollections',
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ text: '', searchType: 'title' });
  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (isLoadingError) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occurred while loading collections.',
    });
    return <Text>Error loading collections: {error?.message}</Text>;
  }

  const collections =
    data &&
    data.collections.map(c => (
      <Grid.Col key={c._id} md={3} sm={4} xs={6}>
        <CollectionCard _id={c._id} color={c.color} description={c.description} title={c.title} />
      </Grid.Col>
    ));

  return (
    <>
      <CollectionsHeader setIsSearching={setIsSearching} setSearchQuery={setSearchQuery} />
      {isSearching && searchQuery.text ? (
        <CollectionSearchResult searchQuery={searchQuery} />
      ) : (
        <Grid>{collections}</Grid>
      )}
    </>
  );
}
