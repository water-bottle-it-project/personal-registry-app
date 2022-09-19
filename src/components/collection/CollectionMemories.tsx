import { Container, Space, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import Lottie from 'lottie-react';
import { NextSeo } from 'next-seo';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineGrid } from '~components/timeline/TimelineGrid';
import emptyLottie from '~components/util/empty-lottie.json';
import { LinkButton } from '~components/util/LinkButton';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';

export function CollectionMemories({ _id }: collectionIdOnlyT) {
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'memory.GetCollectionMemories',
    { _id: _id },
  ]);
  const { data: collectionData } = trpcClient.useQuery(['collection.GetCollection', { _id: _id }]);

  let contents;
  if (isLoading || !data?.memories || !collectionData) {
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
      <NextSeo
        description={
          collectionData
            ? `Viewing memories within collection ${collectionData.collection.title}`
            : 'Viewing memories within a collection'
        }
        title={
          collectionData ? `View memories in ${collectionData.collection.title}` : 'View memories'
        }
      />
      <Container size='xl'>
        <Space h='xl' />
        <Title order={1}>
          Memories in collection{' '}
          <Text color={collectionData && `${collectionData.collection.color}.5`} inherit span>
            {collectionData?.collection.title}
          </Text>
        </Title>
        <Text>{data?.memories ? `${data.memories.length} found` : ' '}</Text>
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
        <Text align='center'>Click below to create a new memory with this collection.</Text>
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
