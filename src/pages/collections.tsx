import { Container } from '@mantine/core';
import type { NextPage } from 'next';
import { CollectionCard } from '~components/collections/CollectionCard';

const Collections: NextPage = () => {
  return (
    <Container px={30} size={1440}>
      <CollectionCard />
    </Container>
  );
};

export default Collections;
