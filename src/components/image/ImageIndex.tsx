import { Container, Modal, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';
// import { ImageOverlay } from './ImageOverlay';
import { ImageOverlay } from './ImageOverlay';
import { ImageSkeleton } from './ImageSkeleton';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function ImagesIndex() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const allUsers = trpcClient.useQuery(['images.listImages']);

  const [opened, setOpened] = useState(false);
  // const [displayPhoto, setDisplayPhoto] = useState('');
  const [loading, setLoading] = useState(true);

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
      (photo: { caption: string; id: string; url: string; userId: string }) => (
        <Container
          key={photo.id}
          onClick={() => renderOverlay(photo.url, photo.caption, photo.userId, true)}
        >
          <ImageCard caption={photo.caption} key={photo.id} url={photo.url} userId={photo.userId} />
        </Container>
      ),
    );
  // console.log(displayPhoto);

  const SkeletonLoaders = Array(12).fill(<ImageSkeleton />);

  useEffect(() => {
    if (Images) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [Images]);

  return (
    <>
      <Modal
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        opened={opened}
        size='calc(100vw - 40%)'
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
          { maxWidth: 'md', cols: 1, spacing: 'md' },
        ]}
        cols={4}
        spacing='xs'
      >
        {loading ? SkeletonLoaders : Images}
      </SimpleGrid>
    </>
  );
}
