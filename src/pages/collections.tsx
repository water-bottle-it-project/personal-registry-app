import { Container } from '@mantine/core';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionIndex } from '~components/collections/CollectionIndex';

const Collections = () => {
  return (
    <>
      <NextSeo description='Create a collection in my personal registry' title='Collections' />
      <Container px={30} size={1440}>
        <CollectionIndex />
      </Container>
    </>
  );
};

export default withAuthedPage(Collections);
