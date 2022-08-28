import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { CollectionIndex } from '~components/collections/CollectionIndex';

const Collections: NextPage = () => {
  return (
    <Container px={30} size={1440}>
      <CollectionIndex />
    </Container>
  );
};

export default Collections;
