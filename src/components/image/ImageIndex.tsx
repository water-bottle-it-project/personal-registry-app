import { SimpleGrid } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function ImagesIndex() {
  const allUsers = trpcClient.useQuery(['images.listImages']);

  const Images =
    allUsers.data &&
    allUsers.data.photos.map(photo => (
      <ImageCard caption={photo.caption} key={photo.id} url={photo.url} userId={photo.userId} />
    ));

  return (
    <SimpleGrid
      breakpoints={[
        { maxWidth: 'xl', cols: 3, spacing: 'md' },
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'xs', cols: 1, spacing: 'xs' },
      ]}
      cols={4}
      spacing='xs'
    >
      {Images}
    </SimpleGrid>
  );
}
