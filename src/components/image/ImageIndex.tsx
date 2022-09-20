import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionIcon,
  Container,
  Modal,
  SimpleGrid,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconSearch } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';
import { ImageOverlay } from './ImageOverlay';
import { ImageSkeleton } from './ImageSkeleton';

const collectionSearchZ = z
  .object({
    text: z.string().trim().max(100),
  })
  .required();

type CollectionSearchT = z.infer<typeof collectionSearchZ>;

/**
 * Image page querying images from mongoDB
 * @constructor
 */
export function ImagesIndex() {
  const { register, handleSubmit } = useForm<CollectionSearchT>({
    resolver: zodResolver(collectionSearchZ),
  });

  const router = useRouter();
  let modal: React.ReactNode = null;
  const viewId = router.query.view;
  const editId = router.query.edit;

  const [searchState, setSearchState] = useState('');

  const isMobile = useMediaQuery('(max-width: 600px)');
  let { data, isError, isLoading, error } = trpcClient.useQuery(['images.listImages']);
  const { data: imageData, error: imageError } = trpcClient.useQuery([
    'images.SearchImages',
    { text: searchState},
  ]);

  const [imageArr, setImageArr] = useState<
    { _id: string; index: number; caption: string; url: string }[]
  >([]);

  const [displayImage, setDisplayImage] = useState({
    _id: '',
    currentImage: '',
    caption: '',
    url: '',
  });

  useEffect(() => {
    if (data?.photos) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setImageArr(data.photos);
    }
  }, [data?.photos]);

  useEffect(() => {
    if (imageData?.photos) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setImageArr(imageData.photos);
    }
  }, [imageData?.photos]);

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

  const handlePrevProject = () => {
    console.log('current image is', displayImage.currentImage);
    if (displayImage.currentImage.toString() != '0') {
      const idx = parseInt(displayImage.currentImage) - 1;
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
    currentImage: string,
  ) => {
    setDisplayImage(previousState => {
      return {
        ...previousState,
        _id: _id,
        caption: photoCaption,
        currentImage: currentImage,
        url: photoUrl,
      };
    });
  };

  const Images = imageArr?.map(
    (photo: { _id: string; index: number; caption: string; url: string }) => (
      <Container
        key={photo.index}
        onClick={() => renderOverlay(photo._id, photo.url, photo.caption, photo.index.toString())}
      >
        <ImageCard _id={photo._id} caption={photo.caption} key={photo.index} url={photo.url} />
      </Container>
    ),
  );

  const SkeletonLoaders = Array(12).fill(<ImageSkeleton />);

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
          _id={displayImage._id}
          caption={displayImage.caption}
          handleNext={handleNextProject}
          handlePrev={handlePrevProject}
          url={displayImage.url}
        />
      </Modal>
    );
  }

  const onSubmit = async ({ text }) => {
    setSearchState(text);
    console.log(text);
  };

  console.log('searched', imageData);

  return (
    <>
      <Stack spacing='sm'>
        <Title>Your Images</Title>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            placeholder='Search your images by caption'
            rightSection={
              <ActionIcon color='indigo' size={32} type='submit' variant='filled'>
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
            rightSectionWidth={42}
            size='md'
            {...register('text')}
          />
        </form>
      </Stack>
      <Space h='xl' />
      {modal}
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'xl', cols: 3, spacing: 'md' },
          { maxWidth: 'md', cols: 1, spacing: 'md' },
        ]}
        cols={4}
        spacing='xs'
      >
        {isLoading ? SkeletonLoaders : Images}
      </SimpleGrid>
    </>
  );
}
