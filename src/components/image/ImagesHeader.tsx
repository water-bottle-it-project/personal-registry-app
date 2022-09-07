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
      <BackgroundImage component="a" src={gradient.src}>
        <Container mx={0} px='5%'>
          <Space h='xl' />
          <Title order={1}>All your Images</Title>
          <Space h='md' />
          <SearchBar />
          <Space h='xl' />
          <Text size="xl">All your Images</Text>
          <Group>
            <Badge color='purple'>Indigo cyan</Badge>
            <Badge color='purple'>Indigo cyan</Badge>
            <Badge color='purple'>Indigo cyan</Badge>
            <Badge color='purple'>Indigo cyan</Badge>
          </Group>
          <Space h='xl' />
        </Container>
      </BackgroundImage>
    </>
  );
}
