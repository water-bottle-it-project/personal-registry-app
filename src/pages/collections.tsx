import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { CollectionIndex } from '~components/collections/CollectionIndex';

const Collections: NextPage = () => {
  const collectionProps = {
    title: 'Gadgets',
    description: 'Go go gadget!!!',
    userId: '1234',
    color: 'blue',
    postCount: 3,
  };

  return (
    <Container px={30} size={1440}>
      <CollectionIndex />
    </Container>
  );
};

export default Collections;
