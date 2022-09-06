import { Anchor, Button, Container, Space, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import Link from 'next/link';

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
        <Link as='/collections/create' href='/collections?create=true' passHref>
          <Anchor color='red' component='a'>
            <Button leftIcon={<IconPlus />}>Add a collection</Button>
          </Anchor>
        </Link>
        <Space h='xl' />
      </Container>
    </>
  );
}
