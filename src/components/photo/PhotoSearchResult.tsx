import { Grid } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { SearchNotFound } from '~components/util/SearchNotFound';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

import { PhotoGallery } from './PhotoGallery';

interface PhotoSearchProps {
  searchText: string;
}

export function PhotoSearchResult({ searchText }: PhotoSearchProps) {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery([
    'photos.SearchPhotos',
    { text: searchText },
  ]);

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (isLoadingError) {
    return <SearchNotFound text={searchText} type='' />;
  }

  const photos = data && (
    <Grid>
      <PhotoGallery photos={data.photos} />
    </Grid>
  );

  console.log(data);

  return (
    <>
      {data.photos?.length === 0 ? (
        <Grid>
          <Grid.Col>
            <SearchNotFound text={searchText} type='' />
          </Grid.Col>
        </Grid>
      ) : (
        photos
      )}
    </>
  );
}
