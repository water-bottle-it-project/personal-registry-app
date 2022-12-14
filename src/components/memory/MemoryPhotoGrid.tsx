import { Grid, Stack } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';

import { MemoryPhotoGridItem } from '~components/memory/MemoryPhotoGridItem';
import type { photoWithIdT } from '~types/photoT';

interface MemoryPhotoGridProps {
  photos: photoWithIdT[];
}

export function MemoryPhotoGrid({ photos }: MemoryPhotoGridProps) {
  const [scrollLocked, setScrollLocked] = useScrollLock(false);
  const [photoIndex, setPhotoIndex] = useState(-1);

  // What im trying to achieve:
  // Distribute photos on the masonry grid evenly
  // My approach:
  // Every nth photo in the photos array, switch columns and populate that column
  // This is a very naive attempt and does not respect photo order (in mobile view)
  let colCount = 0;
  const photoCol0: React.ReactElement[] = [];
  const photoCol1: React.ReactElement[] = [];
  const photoCol2: React.ReactElement[] = [];

  function handlePhotoClick(i: number) {
    setPhotoIndex(i);
    setScrollLocked(scrollLocked => !scrollLocked);
  }

  for (let i = 0; i < photos.length; i++) {
    // every nth index (where n = 2), switch to adjacent column and populate
    if ((i - 1) % 2 == 0 && i !== 0) {
      colCount = (colCount + 1) % 3;
    }
    const photoElem = (
      <div
        key={photos[i]._id}
        onClick={() => {
          handlePhotoClick(i);
        }}
      >
        <MemoryPhotoGridItem {...photos[i]} />
      </div>
    );
    if (colCount === 0) {
      photoCol0.push(photoElem);
    } else if (colCount === 1) {
      photoCol1.push(photoElem);
    } else {
      photoCol2.push(photoElem);
    }
  }

  const currentPhoto = photos[photoIndex];

  return (
    <>
      <Grid>
        <Grid.Col lg={4} md={6}>
          <Stack align='center' justify='flex-start' spacing='xs'>
            {photoCol0}
          </Stack>
        </Grid.Col>
        <Grid.Col lg={4} md={6}>
          <Stack align='center' justify='flex-start' spacing='xs'>
            {photoCol1}
          </Stack>
        </Grid.Col>
        <Grid.Col lg={4} md={6}>
          <Stack align='center' justify='flex-start' spacing='xs'>
            {photoCol2}
          </Stack>
        </Grid.Col>
      </Grid>
      {!!currentPhoto && (
        <Lightbox
          imageTitle={photos[photoIndex].caption}
          mainSrc={photos[photoIndex].url}
          mainSrcThumbnail={photos[photoIndex].url}
          nextSrc={photos[(photoIndex + 1) % photos.length].url}
          onCloseRequest={() => {
            setPhotoIndex(-1);
            setScrollLocked(!scrollLocked);
          }}
          onImageLoad={() => {
            window.dispatchEvent(new Event('resize'));
          }}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photos.length)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + photos.length - 1) % photos.length)}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].url}
        />
      )}
    </>
  );
}
