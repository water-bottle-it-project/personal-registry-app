import 'photoswipe/dist/photoswipe.css';

import { Grid } from '@mantine/core';
import { Gallery, Item } from 'react-photoswipe-gallery';

import { PhotoCard } from '~components/photo/PhotoCard';
import type { photoWithIdT } from '~types/photo/photo';

interface PhotoGalleryProps {
  photos: photoWithIdT[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <Gallery>
      {photos.map(p => (
        <Item
          alt={p.caption}
          height={p.height}
          key={p._id}
          original={p.url}
          thumbnail={p.url}
          width={p.width}
        >
          {({ ref, open }) => (
            <Grid.Col md={3} sm={4} xs={6}>
              <PhotoCard
                {...p}
                itemRef={ref as React.MutableRefObject<HTMLDivElement>}
                open={open}
              />
            </Grid.Col>
          )}
        </Item>
      ))}
    </Gallery>
  );
}
