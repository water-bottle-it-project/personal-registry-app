import { Container, Space } from '@mantine/core';
import type { NextPage } from 'next';

import { ImagesIndex } from '~components/image/ImageIndex';
import { ImagesHeader } from '~components/image/ImagesHeader';

const Images: NextPage = () => {
  return (
    <>
      <Container size='xl'>
        <ImagesHeader />
        <Space h='xl' />
        <ImagesIndex />
      </Container>
    </>
  );
};

export default Images;
