import { Chip, Container, Group, Space, Text, useMantineTheme } from '@mantine/core';

import { SearchBar } from '~components/util/searchBar';

export function ImagesHeader() {
  const theme = useMantineTheme();
  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <SearchBar
          searchFilters={['Title', 'Description', 'Collection']}
          searchPlaceHolder='Search for an image'
          searchTitle='All Images'
        />
        <Space h='xl' />
        <Text size='md'>Collections</Text>
        <Space h='xs' />
        <Group>
          {/* Only way I know how to change chip color is by using !imporant, but bad practice
          Not too sure of any other way, as the gray seems to be programmed to override anything else */}
          <Chip
            color='red'
            radius='md'
            styles={{
              label: { color: 'black', backgroundColor: `${theme.colors.red[2]} !important` },
            }}
            variant='filled'
          >
            Gadgets
          </Chip>
          <Chip
            color='teal'
            radius='md'
            styles={{
              label: { color: 'black', backgroundColor: `${theme.colors.teal[2]} !important` },
            }}
            variant='filled'
          >
            Friends
          </Chip>
          <Chip
            color='indigo'
            radius='md'
            styles={{
              label: { color: 'black', backgroundColor: `${theme.colors.indigo[2]} !important` },
            }}
            variant='filled'
          >
            Family
          </Chip>
          <Chip
            color='gray'
            radius='md'
            styles={{
              label: { color: 'black', backgroundColor: `${theme.colors.gray[2]} !important` },
            }}
            variant='filled'
          >
            Travel
          </Chip>
        </Group>
        <Space h='xl' />
      </Container>
    </>
  );
}
