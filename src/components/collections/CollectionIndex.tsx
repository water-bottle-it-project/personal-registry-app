import { Container, Modal, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { Key } from 'react';
import { useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import collections from '~pages/collections';

import { CollectionCard } from './CollectionCard';
import { CollectionEditOverlay } from './CollectionEditOverlay';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function CollectionIndex() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const allUsers = trpcClient.useQuery(['collections.listCollections']);
  const postNumberTemp = 4; //HARDCODED FOR NOW, TODO: Post backend stuff

  const [opened, setOpened] = useState(false);

  const [displayEditModal, setEditModal] = useState({
    title: '',
    desc: '',
    userId: '',
    color: '',
  });

  const renderOverlay = (
    title: string,
    desc: string,
    userId: string,
    color: string,
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpened(value);
    setEditModal(previousState => {
      return { ...previousState, title: title, desc: desc, color: color, userId: userId };
    });
  };

  const Collections =
    allUsers.data &&
    allUsers.data.collections.map(
      (collection: {
        color: string;
        description: string;
        id: Key | null | undefined;
        title: string;
        userId: string;
      }) => (
        <CollectionCard
          color={collection.color}
          description={collection.description}
          key={collection.id}
          openModal={renderOverlay}
          postCount={postNumberTemp}
          title={collection.title}
          userId={collection.userId}
        />
      ),
    );

  return (
    <>
      <Modal
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        opened={opened}
        size='calc(100vw - 60%)'
        transition='fade'
        transitionDuration={250}
        transitionTimingFunction='ease'
      >
        <CollectionEditOverlay
          color={displayEditModal.color}
          description={displayEditModal.desc}
          title={displayEditModal.title}
          userId={displayEditModal.userId}
        />
      </Modal>
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
    </>
  );
}
