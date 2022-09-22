import { Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function ImagesIndex() {
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width: 600px)');
  const { data, isError, isLoading, error } = trpcClient.useQuery(['images.listImages']);

  const images =
    data &&
    data.photos.map(photo => (
      <Grid.Col key={photo._id} md={3} sm={4} xs={6}>
        <ImageCard _id={photo._id} caption={photo.caption} key={photo.index} url={photo.url} />
      </Grid.Col>
    ));

  return (
    <>
      <Grid>{images}</Grid>
    </>
  );
}
