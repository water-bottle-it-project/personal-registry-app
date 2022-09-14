import {
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Select,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconDownload } from '@tabler/icons';
import Link from 'next/link';

import type { memoryWithPhotosT } from '~types/memory/memoryForm';

interface MemoryHeaderProps extends memoryWithPhotosT {
  imageCount?: number;
}

export function MemoryHeader({
  _id,
  title,
  collections,
  description,
  firstDate,
  lastDate,
}: MemoryHeaderProps) {
  const fDate = new Date(firstDate).toDateString();
  const lDate = new Date(lastDate).toDateString();
  const collectionBadges = collections.map(c => (
    <Badge
      key={c.collectionTitle}
      radius='xs'
      sx={theme => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors[c.collectionColor][5]
            : theme.colors[c.collectionColor][2],
        color: 'black',
      })}
    >
      <Link
        as={`/collections/edit?id=${c.collectionId}`}
        href={`/collections?edit=${c.collectionId}`}
        passHref
        shallow
      >
        <Anchor component='a' variant='text'>
          {c.collectionTitle}
        </Anchor>
      </Link>
    </Badge>
  ));
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xl,
      })}
    >
      <Container size='xl'>
        <Group>
          <Title order={1}>{title || 'Memory Name'}</Title>
          <Button variant='outline'>Edit</Button>
        </Group>
        <Space h='xs' />
        <Text>{description || 'Description here'}</Text>
        <Space h='md' />
        <Title order={4}>Memory creation date</Title>
        <Text>35 February 2090</Text>
        <Space h='sm' />
        <Title order={4}>Memory range</Title>
        <Text>{`${fDate || 'FirstDate'} to ${lDate || 'LastDate'}`}</Text>
        <Space h='xl' />
        <Title order={4}>Collections</Title>
        <Space h='sm' />
        <Group>{collectionBadges}</Group>
        <Space h='xl' />
        <Button leftIcon={<IconDownload />} variant='outline'>
          Download Collection
        </Button>
      </Container>
    </Box>
  );
}
