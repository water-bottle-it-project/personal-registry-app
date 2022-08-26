import { SimpleGrid } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';

import { CollectionCard } from './CollectionCard';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function CollectionIndex() {
  const collectionProps = {
    title: 'Gadgets',
    description: 'Go go gadget!!!',
    userId: '1234',
    color: 'blue',
    postCount: 3,
  };

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
      <CollectionCard
        color={collectionProps.color}
        description={collectionProps.description}
        postCount={collectionProps.postCount}
        title={collectionProps.title}
        userId={collectionProps.userId}
      />
    </SimpleGrid>
  );
}
