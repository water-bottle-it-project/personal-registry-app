import { Container } from '@mantine/core';
import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionsGrid } from '~components/collection/CollectionsGrid';

const Collections = () => {
  return (
    <>
      <NextSeo description='Create a collection in my personal registry' title='Collections' />
      <Container size='xl'>
        <CollectionsGrid />
      </Container>
    </>
  );
};

export default withAuthedPage(Collections);
