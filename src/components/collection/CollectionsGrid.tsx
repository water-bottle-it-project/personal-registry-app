import { Grid, SimpleGrid, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';

import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionCard } from '~components/collection/CollectionCard';

import { CollectionSkeleton } from './CollectionSkeleton';

export function CollectionsGrid() {
  const { data, isError, isLoading, error } = trpcClient.useQuery(['collection.GetCollections']);

  if (isLoading) {
    const SkeletonLoaders = Array(12).fill(<CollectionSkeleton />);
    // return <Text>Loading collections... (replace with skeleton)</Text>;
    return (
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'xl', cols: 3, spacing: 'md' },
          { maxWidth: 'md', cols: 1, spacing: 'md' },
        ]}
        cols={4}
        spacing='xs'
      >
        {SkeletonLoaders}
      </SimpleGrid>
    );
  }

  if (isError) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occured while loading collections.',
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
      <Grid>{collections}</Grid>
    </>
  );
}
