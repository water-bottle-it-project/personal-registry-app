import 'photoswipe/dist/photoswipe.css';

import type { photoWithIdT } from '~types/photo/photo';

interface PhotoGalleryProps {
  photos: photoWithIdT;
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return <div>Hi</div>;
}
