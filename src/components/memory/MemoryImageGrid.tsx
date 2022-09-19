import { Grid, Stack } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';

import { MemoryImageGridItem } from '~components/memory/MemoryImageGridItem';
import type { photoWithIdT } from '~types/photo/photo';

interface MemoryImageGrid2Props {
  photos: photoWithIdT[];
}

export function MemoryImageGrid({ photos }: MemoryImageGrid2Props) {
  const [scrollLocked, setScrollLocked] = useScrollLock(false);
  const [photoIndex, setPhotoIndex] = useState(-1);

  // What im trying to achieve:
  // Distribute images on the masonry grid evenly
  // My approach:
  // Every nth photo in the photos array, switch columns and populate that column
  // This is a very naive attempt and does not respect image order (in mobile view)
  let colCount = 1;
  const photoCol1: React.ReactElement[] = [];
  const photoCol2: React.ReactElement[] = [];
  const photoCol3: React.ReactElement[] = [];

  function handlePhotoClick(i: number) {
    setPhotoIndex(i);
    setScrollLocked(scrollLocked => !scrollLocked);
  }

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
    const photoElem = (
      <div
        onClick={() => {
          handlePhotoClick(i);
        }}
      >
        <MemoryImageGridItem
          _id={photos[i]._id}
          key={photos[i]._id}
          photoDate={new Date()}
          url={photos[i].url}
        />
      </div>
    );
    if (colCount === 1) {
      photoCol1.push(photoElem);
    } else if (colCount === 2) {
      photoCol2.push(photoElem);
    } else {
      photoCol3.push(photoElem);
    }
  }

  const currentImage = photos[photoIndex];

  return (
    <>
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
      {!!currentImage && (
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
