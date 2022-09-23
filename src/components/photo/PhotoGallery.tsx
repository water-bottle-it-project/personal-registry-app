import 'photoswipe/dist/photoswipe.css';
import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css';

import { Grid } from '@mantine/core';
import { useRouter } from 'next/router';
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin';
import type { GalleryProps } from 'react-photoswipe-gallery';
import { Gallery, Item } from 'react-photoswipe-gallery';

import { iconToMemory } from '~components/photo/customElements/iconToMemory';
import { PhotoCard } from '~components/photo/PhotoCard';
import type { photoWithIdT } from '~types/photo/photo';

interface PhotoGalleryProps {
  photos: photoWithIdT[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const router = useRouter();

  function redirect(memoryId: string) {
    void router.push(`/memory/${memoryId}`);
  }

  const customElements: GalleryProps['uiElements'] = [
    {
      name: 'memoryLink',
      order: 9,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: iconToMemory,
        size: 24,
      },
      onClick: (e, element, pswp) => {
        e.stopPropagation();
        e.preventDefault();
        redirect(photos[pswp.currIndex].memoryId);
      },
    },
  ];

  return (
    <Gallery
      plugins={pswpLightbox => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const captionPlugin = new PhotoSwipeDynamicCaption(pswpLightbox, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          captionContent: (slide: any) => slide.data.alt,
        });
      }}
      uiElements={customElements}
      withDownloadButton
    >
      {photos.map(p => (
        <Item
          alt={getAlt(p)}
          height={p.height}
          id={p._id}
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

function getAlt({ memoryDate, photoDate, caption, location, width, height }: photoWithIdT): string {
  const strings = [];

  strings.push(`Memory date:<br><b>${new Date(memoryDate).toDateString()}</b>`);
  if (photoDate) {
    strings.push(`Photo date:<br><b>${new Date(photoDate).toDateString()}</b>`);
  }
  if (caption) {
    strings.push(`Caption:<br><b>${caption}</b>`);
  }
  if (location) {
    strings.push(`Location:<br><b>${location}</b>`);
  }
  if (width && height) {
    strings.push(`Resolution:<br><b>${width} x ${height}</b>`);
  }

  return strings.join(`<sub>&nbsp</sub><br>`);
}
