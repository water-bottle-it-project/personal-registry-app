import {
  ActionIcon,
  Center,
  Container,
  Group,
  Loader,
  Pagination,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconArrowRight, IconSearch } from '@tabler/icons';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineGrid } from '~components/timeline/TimelineGrid';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import { SortedControl } from '~components/util/SortedControl';
import { usePage } from '~components/util/usePage';
import type { sortOrderT } from '~types/util/sortOrderT';

export function TimelineIndex() {
  const router = useRouter();
  const page = usePage();
  const [text, setText] = useDebouncedState('', 300);
  const [sortOrder, setSortOrder] = useState<sortOrderT>('descending');

  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError, refetch, isFetching } = trpcClient.useQuery(
    ['memory.GetMemoriesPaginated', { page, text: text.trim(), sortOrder }],
    { keepPreviousData: true },
  );

  console.log('rendered');

  async function handleEnter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await refetch();
  }

  async function changePage(newPage: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page, ...newQuery } = router.query;
    await router.push({
      pathname: '',
      query: newPage === 1 ? newQuery : { ...newQuery, page: newPage },
    });
  }

  useEffect(() => {
    // We only know the pages once the data is loaded.
    // If the page is more than the total number of pages, go to the last page.
    if (data?.totalPages && page > data.totalPages) {
      router
        .replace({
          pathname: '',
          query: { ...router.query, page: data.totalPages },
        })
        .then(() => {
          return;
        });
    }
  }, [data, page, router]);

  let contents;
  if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading memories. Try again later.</Text>;
  } else {
    contents = (
      <>
        <TimelineGrid memories={data.docs} />
        <Space h='xl' />
        <Center>
          <Stack align='center' spacing='xs'>
            <Text color='dimmed' size='sm'>
              {data.docs.length
                ? `Viewing memories ${data.pagingCounter} to ${
                    data.pagingCounter + data.docs.length - 1
                  } of ${data.totalDocs}`
                : 'No memories found'}
            </Text>
            <Pagination
              onChange={changePage}
              page={page}
              siblings={3}
              total={data.totalPages}
              withEdges
            />
          </Stack>
        </Center>
      </>
    );
  }

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <Stack spacing='sm'>
          <Title>Your memories</Title>
          <form onSubmit={handleEnter}>
            <TextInput
              icon={<IconSearch size={18} stroke={1.5} />}
              onChange={event => setText(event.currentTarget.value)}
              placeholder='Search your memories by title and description'
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
            <Space h='xs' />
            <Group position='apart'>
              <SortedControl defaultValue={sortOrder} sortOrder={setSortOrder} />
            </Group>
          </form>
        </Stack>
        <Space h='xl' />
        {contents}
        <Space h='xl' />
      </Container>
    </>
  );
}
