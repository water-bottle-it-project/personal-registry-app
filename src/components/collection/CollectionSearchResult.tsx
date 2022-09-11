import { Anchor, Button, Container, Grid, Space, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconX } from '@tabler/icons';
import Link from 'next/link';

import { trpcClient } from '~clientUtils/trpcClient';

import { CollectionCard } from './CollectionCard';
import { CollectionSearchForm } from './CollectionSearch';
import { CollectionSkeleton } from './CollectionSkeleton';

interface CollectionSearchResultProps {
  searchText: string;
}

export function CollectionSearchResult(props: CollectionSearchResultProps) {
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'collection.SearchCollectionTitle',
    props.searchText,
  ]);

  if (isLoading) {
    // Need to provide a key for React components when mapping over an array (check devtools console).
    // Use same grid as the data grid to have consistent sizing.
    const skeletonLoaders = Array.from({ length: 10 }, (_, i) => (
      <Grid.Col key={i} md={3} sm={4} xs={6}>
        <CollectionSkeleton />
      </Grid.Col>
    ));

    return <Grid>{skeletonLoaders}</Grid>;
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

  return <Grid>{collections}</Grid>;
}
