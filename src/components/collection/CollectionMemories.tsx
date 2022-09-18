import { Container, Grid, Space, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import Lottie from 'lottie-react';
import { NextSeo } from 'next-seo';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineCard } from '~components/timeline/TimelineCard';
import { TimelineSkeleton } from '~components/timeline/TimelineSkeleton';
import emptyLottie from '~components/util/empty-lottie.json';
import { LinkButton } from '~components/util/LinkButton';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';

export function CollectionMemories({ _id }: collectionIdOnlyT) {
  const theme = useMantineTheme();
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'memory.GetCollectionMemories',
    { _id: _id },
  ]);
  const collectionData = trpcClient.useQuery(['collection.GetCollection', { _id: _id }])?.data
    ?.collection;

  if (isLoading) {
    const skeletonLoaders = Array.from({ length: 10 }, (_, i) => (
      <Grid.Col key={i} md={3} sm={4} xs={6}>
        <TimelineSkeleton />
      </Grid.Col>
    ));

    return (
      <Container size='xl'>
        <Grid>{skeletonLoaders}</Grid>
      </Container>
    );
  }
  if (isLoadingError || error) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occurred while loading memories.',
    });
    return <Text>Error loading Memories</Text>;
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
        <Grid>{memories?.length === 0 ? <NoMemoriesFound /> : memories}</Grid>
        <Space h='xl' />
      </Container>
    </>
  );
}

function NoMemoriesFound() {
  const theme = useMantineTheme();
  return (
    <Grid.Col>
      <Space h='xl' />
      <Stack align='center'>
        <Lottie
          animationData={theme.colorScheme === 'dark' ? emptyLottie : emptyLottie}
          loop
          style={{ maxWidth: '500px', maxHeight: '500px' }}
        />
        <Title align='center' order={1}>
          It's looking a little empty here...
        </Title>
        <Text align='center'>Click the button below to begin creating your first memory.</Text>
        <LinkButton
          gradient={{ from: 'indigo', to: 'cyan' }}
          href='/create'
          size='md'
          variant='gradient'
        >
          Create a Memory
        </LinkButton>
      </Stack>
    </Grid.Col>
  );
}
