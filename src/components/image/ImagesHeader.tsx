import { Chip, Container, createStyles, Group, Space, Text } from '@mantine/core';

import { SearchBar } from '~components/util/searchBar';

export function ImagesHeader() {
  return (
    <>
      <Container mx={0} px={0}>
        <Space h='xl' />
        <SearchBar
          searchFilters={['Title', 'Description', 'Collection']}
          searchPlaceHolder='search for an image'
          searchTitle='All Images'
        />
        <Space h='xl' />
        <Text size='md'>Collections</Text>
        <Space h='xs' />
        <Group>
          <Chip color='purple'>Indigo</Chip>
          <Chip color='teal'>Awesome chip</Chip>
          <Chip color='purple'>Indigo</Chip>
          <Chip color='purple'>cyan</Chip>
        </Group>
        <Space h='xl' />
      </Container>
    </>
  );
}
