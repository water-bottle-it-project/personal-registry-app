import { Grid } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { SearchNotFound } from '~components/util/SearchNotFound';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

import { CollectionCard } from './CollectionCard';

interface CollectionSearchResultProps {
  searchQuery: { text: string; searchType: string };
}

export function CollectionSearchResult({ searchQuery }: CollectionSearchResultProps) {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery([
    'collection.SearchCollections',
    searchQuery,
  ]);

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (isLoadingError) {
    return <SearchNotFound text={searchQuery.text} type={searchQuery.searchType} />;
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
          <SearchNotFound text={searchQuery.text} type={searchQuery.searchType} />
        </Grid.Col>
      ) : (
        collections
      )}
    </Grid>
  );
}
