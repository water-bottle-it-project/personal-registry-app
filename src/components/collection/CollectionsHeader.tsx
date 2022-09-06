import { Button, Container, Space, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import { CollectionSearchForm } from './CollectionSearch';

export function CollectionsHeader() {
  return (
    <>
      <Container mx={0} px={0}>
        <Space h='xl' />
        <Title order={1}>Your Collections</Title>
        <Space h='md' />
        <CollectionSearchForm />
        <Space h='xl' />
        <Button leftIcon={<IconPlus />}>Add a collection</Button>
        <Space h='xl' />
      </Container>
    </>
  );
}
