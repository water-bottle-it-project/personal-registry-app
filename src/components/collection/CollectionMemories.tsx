import { Container, Grid, Space, Text, Title, useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { NextSeo } from 'next-seo';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineCard } from '~components/timeline/TimelineCard';
import { TimelineSkeleton } from '~components/timeline/TimelineSkeleton';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';

export function CollectionMemories({ _id }: collectionIdOnlyT) {
  const theme = useMantineTheme();
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'memory.GetCollectionMemories',
    { _id: _id },
  ]);
  const collectionData = trpcClient.useQuery(['collection.GetCollection', { _id: _id }])?.data
    ?.collection;

  if (isLoading || !data?.memories) {
    const skeletonLoaders = Array.from({ length: 10 }, (_, i) => (
      <Grid.Col key={i} md={3} sm={4} xs={6}>
        <TimelineSkeleton />
      </Grid.Col>
    ));

    return <Grid>{skeletonLoaders}</Grid>;
  }
  if (isLoadingError) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occurred while loading memories.',
    });
    return <Text>Error loading collections</Text>;
  }

  const sortedMemories =
    data &&
    data.memories.sort((a, b) => new Date(a.firstDate).getTime() - new Date(b.firstDate).getTime());
  const memories =
    sortedMemories &&
    sortedMemories.map(c => (
      <Grid.Col key={c._id} md={3} sm={4} xs={6}>
        <TimelineCard
          _id={c._id}
          collections={c.collections}
          description={c.description ? c.description : ''}
          firstDate={new Date(c.firstDate)}
          lastDate={new Date(c.lastDate)}
          photoPreviewUrl={c.photoPreviewUrl}
          photos={c.photos}
          title={c.title}
        />
      </Grid.Col>
    ));

  return (
    <>
      <NextSeo description='Viewing memories within a collection' title='View Memories' />
      <Container size='xl'>
        <Space h='xl' />
        <Title order={1}>
          Memories in collection{' '}
          <Text color={collectionData && theme.colors[collectionData?.color][5]} inherit span>
            {collectionData?.title}
          </Text>
        </Title>
        <Space h='xl' />
        <Grid>{memories}</Grid>
        <Space h='xl' />
      </Container>
    </>
  );
}
