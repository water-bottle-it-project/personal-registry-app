import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { ImagesIndex } from '~components/image/ImageIndex';
import { ImageOverlay } from '~components/image/ImageOverlay';

const Image: NextPage = () => {
  return (
    <Container px={30} size={1500}>
      <div>All Images hehe</div>
      <ImageOverlay />
    </Container>
  );
};

export default Image;
