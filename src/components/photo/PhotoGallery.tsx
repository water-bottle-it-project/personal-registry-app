import 'photoswipe/dist/photoswipe.css';

import type { photoWithMemoryT } from '~types/photo/photo';

interface PhotoGalleryProps {
  photos: photoWithMemoryT;
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return <div>Hi</div>;
}
