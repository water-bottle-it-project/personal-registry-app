import {
  Box,
  Container,
  createStyles,
  Group,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import ObjectID from 'bson-objectid';
import Lottie from 'lottie-react';
import { NextSeo } from 'next-seo';

import { trpcClient } from '~clientUtils/trpcClient';
import { AllMemoriesGrid } from '~components/allMemories/AllMemoriesGrid';
import emptyLottie from '~components/util/empty-lottie.json';
import errorLottie from '~components/util/error-lottie.json';
import { LinkButton } from '~components/util/LinkButton';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import type { collectionIdOnlyT } from '~types/collectionT';

export function CollectionMemories({ _id }: collectionIdOnlyT) {
  const { classes } = useStyles();

  const { data, isLoading } = trpcClient.useQuery(['memory.GetCollectionMemories', { _id: _id }]);
  const {
    data: collectionData,
    isLoadingError,
    error,
  } = trpcClient.useQuery(['collection.GetCollection', { _id: _id }]);

  let contents;
  if (isLoadingError) {
    contents = (
      <Stack align='center' justify='center'>
        <Space h='md' />
        <Lottie animationData={errorLottie} loop={false} style={{ width: '50%', maxWidth: 180 }} />
        <Text align='center'>Error loading memories for collection: {error?.message}</Text>
        <LinkButton
          gradient={{ from: 'indigo', to: 'cyan' }}
          href='/collections'
          size='md'
          variant='gradient'
        >
          View all collections
        </LinkButton>
        <Text align='center'>
          Memories for this collection will be automatically refetched without reloading when you
          refocus the window or tab. You can also reload the page.
        </Text>
      </Stack>
    );
  } else if (isLoading || !data || !collectionData) {
    contents = <SkeletonGrid />;
  } else if (data.memories.length === 0) {
    contents = <NoMemoriesFound />;
  } else {
    contents = <AllMemoriesGrid memories={data.memories} />;
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
        <Group position='apart' spacing='sm'>
          <Title>
            Memories in collection{' '}
            <Text color={collectionData && `${collectionData.collection.color}.5`} inherit span>
              {collectionData?.collection.title}
            </Text>
          </Title>
          {data && collectionData && (
            <Box>
              <Title order={4} size='md'>
                Created{' '}
                <Text ml={4} size='sm' span weight={400}>
                  {new ObjectID(_id).getTimestamp().toDateString()}
                </Text>
              </Title>
            </Box>
          )}
        </Group>

        <Space h='sm' />
        <Text className={classes.description}>{collectionData?.collection.description}</Text>
        <Space h='sm' />
        <Text color='dimmed'>
          {data &&
            collectionData &&
            `${data.memories.length} ${data.memories.length === 1 ? 'memory' : 'memories'} found`}
        </Text>
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
          Create a memory
        </LinkButton>
      </Stack>
    </>
  );
}

const useStyles = createStyles({
  description: {
    whiteSpace: 'pre-wrap',
  },
});
