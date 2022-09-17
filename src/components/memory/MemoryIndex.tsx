import 'react-18-image-lightbox/style.css';

import { Container, Grid, Space, Stack, Switch } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';

import { trpcClient } from '~clientUtils/trpcClient';
import type { photoIdOnlyT } from '~types/photo/photo';

import { MemoryHeader } from './MemoryHeader';
import { MemoryImage } from './MemoryImage';
import { MemoryImageGrid } from './MemoryImageGrid';

interface MemoryIndexProps {
  _id: string;
}

export function MemoryIndex(props: MemoryIndexProps) {
  const [scrollLocked, setScrollLocked] = useScrollLock(false);
  const [gridView, setGridView] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(-1);
  const { data, isLoadingError, isLoading } = trpcClient.useQuery([
    'memory.GetMemory',
    { _id: props._id },
  ]);
  if (isLoading || !data?.memory) {
    return <div>Loading...</div>;
  }
  if (isLoadingError) {
    return <div>Error loading memory</div>;
  }
  const { title, collections, description, firstDate, lastDate, photos } = data.memory;

  const lightboxPhotos = photos.map(photo => ({ url: photo.url, caption: photo.caption }));

  // What im trying to achieve:
  // Distribute images on the masonry grid evenly
  // My approach:
  // Every nth photo in the photos array, switch columns and populate that column
  // This is a very naive attempt and does not respect image order (in mobile view)
  let colCount = 1;
  const photoCol1: React.ReactElement[] = [];
  const photoCol2: React.ReactElement[] = [];
  const photoCol3: React.ReactElement[] = [];

  for (let i = 0; i < photos.length; i++) {
    // every nth index (where n = 2), switch to adjacent column and populate
    if ((i - 1) % 2 == 0 && i !== 0) {
      switch (colCount) {
        case 1:
          colCount = 2;
          break;
        case 2:
          colCount = 3;
          break;
        case 3:
          colCount = 1;
          break;
      }
    }
    if (colCount === 1) {
      photoCol1.push(
        <div
          onClick={() => {
            setPhotoIndex(lightboxPhotos.map(e => e.url).indexOf(photos[i].url));
            setScrollLocked(!scrollLocked);
          }}
        >
          <MemoryImageGrid _id={photos[i]._id} key={i} />
        </div>,
      );
    } else if (colCount === 2) {
      photoCol2.push(
        <div
          onClick={() => {
            setPhotoIndex(lightboxPhotos.map(e => e.url).indexOf(photos[i].url));
            setScrollLocked(!scrollLocked);
          }}
        >
          <MemoryImageGrid _id={photos[i]._id} key={i} />
        </div>,
      );
    } else {
      photoCol3.push(
        <div
          onClick={() => {
            setPhotoIndex(lightboxPhotos.map(e => e.url).indexOf(photos[i].url));
            setScrollLocked(!scrollLocked);
          }}
        >
          <MemoryImageGrid _id={photos[i]._id} key={i} />
        </div>,
      );
    }
  }

  const currentImage = lightboxPhotos[photoIndex];

  // we are doing double the queries here, we should combine
  const MemoryPhotos =
    photos && photos.map((c: photoIdOnlyT) => <MemoryImage _id={c._id} key={c._id} />);

  return (
    <>
      <MemoryHeader
        _id={props._id}
        collections={collections}
        description={description}
        firstDate={firstDate}
        lastDate={lastDate}
        photos={photos}
        title={title}
      />
      <Space h='xl' />
      <Container size='xl'>
        <Switch
          checked={gridView}
          label={`${gridView ? 'Grid View' : 'Stacked View'}`}
          onChange={event => setGridView(event.target.checked)}
          size='md'
        />
        <Space h='xl' />
        {gridView ? (
          <Grid>
            <Grid.Col lg={4} md={6}>
              <Stack align='flex-start' justify='flex-start' spacing='xs'>
                {photoCol1}
              </Stack>
            </Grid.Col>
            <Grid.Col lg={4} md={6}>
              <Stack align='flex-start' justify='flex-start' spacing='xs'>
                {photoCol2}
              </Stack>
            </Grid.Col>
            <Grid.Col lg={4} md={6}>
              <Stack align='flex-start' justify='flex-start' spacing='xs'>
                {photoCol3}
              </Stack>
            </Grid.Col>
          </Grid>
        ) : (
          MemoryPhotos
        )}
      </Container>

      {!!currentImage && (
        <Lightbox
          imageTitle={lightboxPhotos[photoIndex].caption}
          mainSrc={lightboxPhotos[photoIndex].url}
          mainSrcThumbnail={lightboxPhotos[photoIndex].url}
          nextSrc={lightboxPhotos[(photoIndex + 1) % lightboxPhotos.length].url}
          onCloseRequest={() => {
            setPhotoIndex(-1);
            setScrollLocked(!scrollLocked);
          }}
          onImageLoad={() => {
            window.dispatchEvent(new Event('resize'));
          }}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lightboxPhotos.length)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + lightboxPhotos.length - 1) % lightboxPhotos.length)
          }
          prevSrc={
            lightboxPhotos[(photoIndex + lightboxPhotos.length - 1) % lightboxPhotos.length].url
          }
        />
      )}
    </>
  );
}
