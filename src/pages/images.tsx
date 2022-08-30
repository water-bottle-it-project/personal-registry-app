import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { ImagesIndex } from '~components/image/ImageIndex';

const Images: NextPage = () => {
  return (
    <Container px={30} size={1500}>
      <div>All Images hehe</div>
      <ImagesIndex />
    </Container>
  );
};

export default Images;
