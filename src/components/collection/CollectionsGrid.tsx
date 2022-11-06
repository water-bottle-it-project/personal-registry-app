import {
  ActionIcon,
  Button,
  CloseButton,
  Grid,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconArrowRight, IconFolderPlus, IconSearch, IconX } from '@tabler/icons';
import { useAtom, useAtomValue } from 'jotai';
import Link from 'next/link';
import type { FormEvent } from 'react';

import { collectionsSearchAtom } from '~clientUtils/atoms';
import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionCard } from '~components/collection/CollectionCard';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

export function CollectionsGrid() {
  const currentText = useAtomValue(collectionsSearchAtom.currentValueAtom);
  const [debouncedText, setText] = useAtom(collectionsSearchAtom.debouncedValueAtom);

  const { data, isLoadingError, isLoading, error, isFetching, refetch } = trpcClient.useQuery(
    ['collection.GetCollections', { text: debouncedText.trim() }],
    { keepPreviousData: true },
  );

  async function handleEnter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await refetch();
  }

  let contents;
  if (isLoadingError) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occurred while loading collections.',
    });
    contents = <Text>Error loading collections: {error?.message}</Text>;
  } else if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else {
    contents = (
      <Grid>
        {data.collections.map(c => (
          <Grid.Col key={c._id} md={3} sm={4} xs={6}>
            <CollectionCard
              _id={c._id}
              color={c.color}
              description={c.description}
              title={c.title}
            />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Space h='xl' />
      <Stack spacing='sm'>
        <Group position='apart'>
          <Title order={1}>Your collections</Title>
          <Link as='/collections/create' href='/collections?create=true' passHref>
            <Button component='a' leftIcon={<IconFolderPlus />}>
              New
            </Button>
          </Link>
        </Group>
        <form onSubmit={handleEnter}>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            onChange={event => setText(event.currentTarget.value)}
            placeholder='Search your collections by title and description'
            rightSection={
              <Group position='right' pr={5} spacing={5}>
                {currentText && <CloseButton onClick={() => setText('')} />}
                <ActionIcon color='indigo' onClick={() => refetch()} size={32} variant='filled'>
                  {isFetching ? (
                    <Loader color='white' size='xs' variant='dots' />
                  ) : (
                    <IconArrowRight size={18} stroke={1.5} />
                  )}
                </ActionIcon>
              </Group>
            }
            rightSectionWidth={currentText ? 70 : 37}
            size='md'
            value={currentText}
          />
        </form>
      </Stack>
      <Space h='xl' />
      {contents}
      <Space h='xl' />
    </>
  );
}
