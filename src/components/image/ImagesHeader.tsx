import {
  Anchor,
  BackgroundImage,
  Badge,
  Button,
  Container,
  Group,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import Link from 'next/link';

import gradient from '~components/homepage/gradient.png';
import { SearchBar } from '~components/util/searchBar';

export function ImagesHeader() {
  return (
    <>
      <BackgroundImage component='a' src={gradient.src}>
        <Container mx={0} px='5%'>
          <Space h='xl' />
          <SearchBar
            searchFilters={['Title', 'Description', 'Collection']}
            searchPlaceHolder='search for an image'
            searchTitle='All Image'
          />
          <Space h='xl' />
          <Text size='md'>Collections</Text>
          <Space h='xs' />
          <Group>
            <Badge color='purple'>Indigo</Badge>
            <Badge color='purple'>cyan</Badge>
            <Badge color='purple'>Indigo</Badge>
            <Badge color='purple'>cyan</Badge>
          </Group>
          <Space h='xl' />
        </Container>
      </BackgroundImage>
    </>
  );
}
