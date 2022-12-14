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
import { IconArrowRight, IconFolderPlus, IconSearch } from '@tabler/icons';
import { useAtom, useAtomValue } from 'jotai';
import Lottie from 'lottie-react';
import Link from 'next/link';
import type { FormEvent } from 'react';

import { collectionsSearchAtom } from '~clientUtils/atoms';
import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionCard } from '~components/collection/CollectionCard';
import errorLottie from '~components/util/error-lottie.json';
import { LinkButton } from '~components/util/LinkButton';
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
    contents = (
      <Stack align='center' justify='center'>
        <Space h='md' />
        <Lottie animationData={errorLottie} loop={false} style={{ width: '50%', maxWidth: 180 }} />
        <Text align='center'>Error loading collections view: {error?.message}</Text>
        <LinkButton gradient={{ from: 'indigo', to: 'cyan' }} href='/' size='md' variant='gradient'>
          Back to homepage
        </LinkButton>
        <Text align='center'>
          Collections will be automatically refetched without reloading when you refocus the window
          or tab. You can also reload the page.
        </Text>
      </Stack>
    );
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
