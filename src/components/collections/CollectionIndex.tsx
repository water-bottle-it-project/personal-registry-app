import { SimpleGrid } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';

import { CollectionCard } from './CollectionCard';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function CollectionIndex() {
  const allUsers = trpcClient.useQuery(['collections.listCollections']);
  const postNumberTemp = 4; //HARDCODED FOR NOW, TODO: Post backend stuff

  const Collections =
    allUsers.data &&
    allUsers.data.collections.map(collection => (
      <CollectionCard
        color={collection.color}
        description={collection.description}
        key={collection.id}
        postCount={postNumberTemp}
        title={collection.title}
        userId={collection.userId}
      />
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
      {Collections}
    </SimpleGrid>
  );
}
