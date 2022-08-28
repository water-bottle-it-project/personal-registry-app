import { Container, Modal, SimpleGrid } from '@mantine/core';
import type { Key } from 'react';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';
import { ImageOverlay } from './ImageOverlay';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function ImagesIndex() {
  const allUsers = trpcClient.useQuery(['images.listImages']);

  const [opened, setOpened] = useState(false);
  // const [displayPhoto, setDisplayPhoto] = useState('');

  const [displayPhoto, setDisplayPhoto] = useState({
    caption: '',
    url: '',
    userId: '',
  });

  const renderOverlay = (
    photoUrl: string,
    photoCaption: string,
    userId: string,
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpened(value);
    setDisplayPhoto(previousState => {
      return { ...previousState, caption: photoCaption, url: photoUrl, userId: userId };
    });
  };

  const Images =
    allUsers.data &&
    allUsers.data.photos.map(
      (photo: { caption: string; id: Key | null | undefined; url: string; userId: string }) => (
        <Container
          key={photo.id}
          onClick={() => renderOverlay(photo.url, photo.caption, photo.userId, true)}
        >
          <ImageCard caption={photo.caption} key={photo.id} url={photo.url} userId={photo.userId} />
        </Container>
      ),
    );
  console.log(displayPhoto);

  return (
    <>
      <Modal
        onClose={() => setOpened(false)}
        opened={opened}
        size='50%'
        transition='fade'
        transitionDuration={250}
        transitionTimingFunction='ease'
      >
        <ImageOverlay
          caption={displayPhoto.caption}
          url={displayPhoto.url}
          userId={displayPhoto.userId}
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
        {Images}
      </SimpleGrid>
      );
    </>
  );
}
