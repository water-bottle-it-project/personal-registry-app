import { Grid } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { SearchNotFound } from '~components/util/SearchNotFound';

import { CollectionCard } from './CollectionCard';
import { CollectionSkeleton } from './CollectionSkeleton';

interface CollectionSearchResultProps {
  searchQuery: { text: string; searchType: string };
}

export function CollectionSearchResult(props: CollectionSearchResultProps) {
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'collection.SearchCollections',
    props.searchQuery,
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
    return <SearchNotFound text={props.searchQuery.text} type={props.searchQuery.searchType} />;
  }

  const collections =
    data &&
    data.collections.map(c => (
      <Grid.Col key={c._id} md={3} sm={4} xs={6}>
        <CollectionCard _id={c._id} color={c.color} description={c.description} title={c.title} />
      </Grid.Col>
    ));

  return (
    <Grid>
      {collections?.length === 0 ? (
        <Grid.Col>
          <SearchNotFound text={props.searchQuery.text} type={props.searchQuery.searchType} />
        </Grid.Col>
      ) : (
        collections
      )}
    </Grid>
  );
}
