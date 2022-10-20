import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconArrowRight, IconPlus, IconSearch, IconX } from '@tabler/icons';
import Link from 'next/link';
import type { FormEvent } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionCard } from '~components/collection/CollectionCard';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

export function CollectionsGrid() {
  const [text, setText] = useDebouncedState('', 300);

  const { data, isLoadingError, isLoading, error, isFetching, refetch } = trpcClient.useQuery(
    ['collection.GetCollections', { text: text.trim() }],
    { keepPreviousData: true },
  );

  async function handleEnter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await refetch();
  }

  if (isLoadingError) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occurred while loading collections.',
    });
    return <Text>Error loading collections: {error?.message}</Text>;
  }

  if (isLoading || !data) {
    return <SkeletonGrid />;
  }

  const contents = (
    <Grid>
      {data.collections.map(c => (
        <Grid.Col key={c._id} md={3} sm={4} xs={6}>
          <CollectionCard _id={c._id} color={c.color} description={c.description} title={c.title} />
        </Grid.Col>
      ))}
    </Grid>
  );

  return (
    <>
      <Space h='xl' />
      <Stack spacing='sm'>
        <Group position='apart'>
          <Title order={1}>Your collections</Title>
          <Link as='/collections/create' href='/collections?create=true' passHref>
            <Button component='a' leftIcon={<IconPlus />}>
              Add a collection
            </Button>
          </Link>
        </Group>
        <form onSubmit={handleEnter}>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            onChange={event => setText(event.currentTarget.value)}
            placeholder='Search your collections by title and description'
            rightSection={
              <ActionIcon color='indigo' onClick={() => refetch()} size={32} variant='filled'>
                {isFetching ? (
                  <Loader color='white' size='xs' variant='dots' />
                ) : (
                  <IconArrowRight size={18} stroke={1.5} />
                )}
              </ActionIcon>
            }
            rightSectionWidth={42}
            size='md'
          />
        </form>
      </Stack>
      <Space h='xl' />
      {contents}
      <Space h='xl' />
    </>
  );
}
