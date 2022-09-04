import { Container, Modal, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { Photo } from '~server/models/photo';

import { ImageCard } from './ImageCard';
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
  const [loading, setLoading] = useState(true);

  const [imageArr, setImageArr] = useState<
    { id: number; caption: string; url: string; userId: string }[]
  >([]);

  const [state, setState] = useState({
    currentImage: '',
    caption: '',
    url: '',
    userId: '',
  });

  // let j = 0;
  const data = allUsers.data && allUsers.data.photos;
  // const data2 =
  //   allUsers.data &&
  //   allUsers.data.photos.map((photo) => {
  //     id= j++, (caption = photo.caption), (url = photo.url), (userId = photo.userId);
  //   });

  useEffect(() => {
    setImageArr(data);
  }, [data]);

  const handleNextProject = () => {
    console.log(state.currentImage);
    const idx = parseInt(state.currentImage) + 1;

    setState(previousState => ({
      ...previousState,
      currentImage: idx.toString(),
      caption: imageArr[idx].caption,
      url: imageArr[idx].url,
    }));
  };

  const renderOverlay = (
    photoUrl: string,
    photoCaption: string,
    userId: string,
    currentImage: string,
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpened(value);
    setState(previousState => {
      return {
        ...previousState,
        caption: photoCaption,
        currentImage: currentImage,
        url: photoUrl,
        userId: userId,
      };
    });
  };

  let i = 0;
  const Images =
    allUsers.data &&
    allUsers.data.photos.map(
      (photo: { caption: string; id: string; url: string; userId: string }) => (
        <Container
          key={photo.id}
          onClick={() =>
            renderOverlay(photo.url, photo.caption, photo.userId, (i++).toString(), true)
          }
        >
          <ImageCard caption={photo.caption} key={photo.id} url={photo.url} userId={photo.userId} />
        </Container>
      ),
    );

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
          caption={state.caption}
          handleNext={handleNextProject}
          url={state.url}
          userId={state.userId}
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
