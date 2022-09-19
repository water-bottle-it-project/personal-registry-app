import { Container, Grid, Space, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { IconX } from '@tabler/icons';
import Lottie from 'lottie-react';
import { NextSeo } from 'next-seo';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineGrid } from '~components/timeline/TimelineGrid';
import emptyLottie from '~components/util/empty-lottie.json';
import { LinkButton } from '~components/util/LinkButton';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';

export function CollectionMemories({ _id }: collectionIdOnlyT) {
  const theme = useMantineTheme();
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'memory.GetCollectionMemories',
    { _id: _id },
  ]);
  const collectionData = trpcClient.useQuery(['collection.GetCollection', { _id: _id }])?.data
    ?.collection;

  let contents;
  if (isLoading || !data?.memories) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading memories. Try again later.</Text>;
  } else if (data.memories.length === 0) {
    contents = <NoMemoriesFound />;
  } else {
    contents = <TimelineGrid memories={data.memories} />;
  }

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <Title order={1}>
          Memories in collection{' '}
          <Text color={collectionData && theme.colors[collectionData?.color][5]} inherit span>
            {collectionData?.title}
          </Text>
        </Title>
        <Space h='xl' />
        {contents}
      </Container>
    </>
  );
}

function NoMemoriesFound() {
  const theme = useMantineTheme();
  return (
    <>
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
    </>
  );
}
