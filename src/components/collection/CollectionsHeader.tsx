import { Anchor, Button, Container, Group, Space, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

import { CollectionSearchForm } from './CollectionSearch';

interface CollectionHeaderProps {
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  setSearchQuery: Dispatch<SetStateAction<{ text: string; searchType: string }>>;
}

export function CollectionsHeader(props: CollectionHeaderProps) {
  return (
    <>
      <Space h='xl' />
      <Group position='apart'>
        <Title order={1}>Your collections</Title>
        <Link as='/collections/create' href='/collections?create=true' passHref>
          <Button component='a' leftIcon={<IconPlus />}>
            Add a collection
          </Button>
        </Link>
      </Group>
      <Space h='md' />
      <CollectionSearchForm
        setIsSearching={props.setIsSearching}
        setSearchQuery={props.setSearchQuery}
      />
      <Space h='xl' />
    </>
  );
}
