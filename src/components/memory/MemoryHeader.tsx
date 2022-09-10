import { Badge, Box, Button, Container, Group, Select, Space, Text, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons';

import { trpcClient } from '~clientUtils/trpcClient';
import type { memoryT } from '~types/memory/memory';

interface MemoryHeaderProps extends memoryT {
  imageCount?: number;
}

export function MemoryHeader({
  _id,
  title,
  description,
  firstDate,
  lastDate,
  collections,
}: MemoryHeaderProps) {
  const collectionsArr = new Array(collections?.length);

  for (let i = 0; i < collections?.length; i++) {
    const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
      'collection.GetCollection',
      { _id: collections[i].collectionId },
    ]);

    collectionsArr[i] = data?.collection.title;
  }

  // console.log(collectionsArr);
  const collectionBadges = collectionsArr.map(c => (
    <Badge key={c} radius='xs'>
      {c}
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
        <Text>1 August 2022</Text>
        <Space h='sm' />
        <Title order={4}>Memory range</Title>
        <Text>
          {firstDate || 'FirstDate'} to {lastDate || 'LastDate'}
        </Text>
        <Space h='xl' />
        <Title order={4}>Collections</Title>
        <Space h='sm' />
        <Group>{collectionBadges}</Group>
        <Space h='xl' />
        <Group position='apart'>
          <Group>
            <Title order={4}>Sort by</Title>
            <Select
              data={[
                { value: 'newToOld', label: 'Newest to Oldest' },
                { value: 'oldToNew', label: 'Oldest to Newest' },
              ]}
              placeholder='Default'
            />
          </Group>
          <div>
            <Button leftIcon={<IconDownload />} variant='outline'>
              Download
            </Button>
          </div>
        </Group>
      </Container>
    </Box>
  );
}
