import { Grid, Modal, Text } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionCard } from '~components/collection/CollectionCard';

export function CollectionsGrid() {
  const { data, isError, isLoading, error } = trpcClient.useQuery(['collection.GetCollections']);

  if (isLoading) {
    return <Text>Loading collections... (replace with skeleton)</Text>;
  }

  if (isError) {
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
