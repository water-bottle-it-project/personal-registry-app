import { Container, Space } from '@mantine/core';
import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { ImagesIndex } from '~components/image/ImageIndex';
import { ImagesHeader } from '~components/image/ImagesHeader';

function Images() {
  return (
    <>
      <NextSeo description='My images' title='Images' />
      <Container size='xl'>
        <ImagesHeader />
        <Space h='xl' />
        <ImagesIndex />
      </Container>
    </>
  );
}

export default withAuthedPage(Images);
