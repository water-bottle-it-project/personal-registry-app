import { Container, Modal, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';
import { ImageOverlay } from './ImageOverlay';
import { ImageSkeleton } from './ImageSkeleton';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function ImagesIndex() {
  const router = useRouter();
  let modal: React.ReactNode = null;
  const viewId = router.query.view;
  const editId = router.query.edit;

  const isMobile = useMediaQuery('(max-width: 600px)');
  const allImages = trpcClient.useQuery(['images.listImages']);

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);

  const [imageArr, setImageArr] = useState<
    { index: number; caption: string; url: string; userId: string }[]
  >([]);

  const [displayImage, setDisplayImage] = useState({
    currentImage: '',
    caption: '',
    url: '',
    userId: '',
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setImageArr(allImages.data?.photos);
  }, [allImages.data?.photos]);

  // add index to the images on the page, which is used for next and prev image functionality
  let idx = 0;
  imageArr?.forEach(element => {
    element.index = idx;
    idx++;
  });

  const handleNextProject = () => {
    // console.log(displayImage.currentImage);
    if (displayImage.currentImage.toString() != (imageArr.length - 1).toString()) {
      const idx = parseInt(displayImage.currentImage) + 1;
      setDisplayImage(previousState => ({
        ...previousState,
        currentImage: idx.toString(),
        caption: imageArr[idx].caption,
        url: imageArr[idx].url,
      }));
    }
  };

  const handlePrevProject = () => {
    console.log('current image is', displayImage.currentImage);
    if (displayImage.currentImage.toString() != '0') {
      const idx = parseInt(displayImage.currentImage) - 1;
      setDisplayImage(previousState => ({
        ...previousState,
        currentImage: idx.toString(),
        caption: imageArr[idx].caption,
        url: imageArr[idx].url,
      }));
    }
  };

  useEffect(() => {
    setImageArr(data?.photos);
  }, [data?.photos]);

  // add index to the images on the page, which is used for next and prev image functionality
  let idx = 0;
  imageArr?.forEach(element => {
    element.index = idx;
    idx++;
  });

  const handleNextProject = () => {
    // console.log(displayImage.currentImage);
    if (displayImage.currentImage.toString() != (imageArr.length - 1).toString()) {
      const idx = parseInt(displayImage.currentImage) + 1;
      setDisplayImage(previousState => ({
        ...previousState,
        _id: imageArr[idx]._id,
        currentImage: idx.toString(),
        caption: imageArr[idx].caption,
        url: imageArr[idx].url,
      }));
    }
  };

  const renderOverlay = (
    _id: string,
    photoUrl: string,
    photoCaption: string,
    userId: string,
    currentImage: string,
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpened(value);
    setDisplayImage(previousState => {
      return {
        ...previousState,
        caption: photoCaption,
        currentImage: currentImage,
        url: photoUrl,
        userId: userId,
      };
    });
  };

  const Images = imageArr?.map(
    (photo: { index: number; caption: string; url: string; userId: string }) => (
      <Container
        key={photo.index}
        onClick={() =>
          renderOverlay(photo.url, photo.caption, photo.userId, photo.index.toString(), true)
        }
      >
        <ImageCard
          caption={photo.caption}
          key={photo.index}
          url={photo.url}
          userId={photo.userId}
        />
      </Container>
    ),
  );

  const skeletonLoaders = Array.from({ length: 10 }, (_, i) => <ImageSkeleton key={i} />);

  if (viewId && !Array.isArray(viewId)) {
    modal = (
      <Modal
        fullScreen={isMobile}
        onClose={() => router.push('/images', undefined, { shallow: true })}
        opened
        size='calc(100vw - 40%)'
        transition='fade'
        transitionDuration={250}
        transitionTimingFunction='ease'
      >
        <ImageOverlay
          _id={displayImage._id}
          caption={displayImage.caption}
          handleNext={handleNextProject}
          handlePrev={handlePrevProject}
          url={displayImage.url}
          userId={displayImage.userId}
        />
      </Modal>
    );
  }

  if (editId && !Array.isArray(editId)) {
    modal = (
      <Modal
        fullScreen={isMobile}
        onClose={() => router.push('/images', undefined, { shallow: true })}
        opened
        size='calc(100vw - 40%)'
        transition='fade'
        transitionDuration={250}
        transitionTimingFunction='ease'
      >
        <ImageOverlay
          caption={displayImage.caption}
          handleNext={handleNextProject}
          handlePrev={handlePrevProject}
          url={displayImage.url}
          userId={displayImage.userId}
        />
      </Modal>
    );
  }

  return (
    <>
      {modal}
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'xl', cols: 3, spacing: 'md' },
          { maxWidth: 'md', cols: 1, spacing: 'md' },
        ]}
        cols={4}
        spacing='xs'
      >
        {loading ? skeletonLoaders : Images}
      </SimpleGrid>
    </>
  );
}
