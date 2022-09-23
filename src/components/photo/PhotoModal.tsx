import { Image, Modal } from '@mantine/core';
import { useRouter } from 'next/router';

import type { photoWithMemoryT } from '~types/photo/photo';

export function PhotoModal({
  caption,
  location,
  memoryDate,
  memoryId,
  photoDate,
  url,
}: photoWithMemoryT) {
  const router = useRouter();

  async function handleClose() {
    // To do: preserve other query params except for id.
    await router.push('/images', undefined, { shallow: true });
  }

  return (
    <Modal lockScroll onClose={handleClose} opened size='lg'>
      <Image alt={caption} src={url} />
    </Modal>
  );
}
