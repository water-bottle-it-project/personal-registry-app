import {
  ActionIcon,
  Center,
  Container,
  Grid,
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
import { PhotoGallery } from '~components/photo/PhotoGallery';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import { SortedControl } from '~components/util/SortedControl';
import { usePage } from '~components/util/usePage';
import type { sortOrderT } from '~types/util/sortOrderT';

/**
 * Photos page querying images from MongoDB
 * @constructor
 */
export function PhotosIndex() {
  const router = useRouter();
  const page = usePage();
  const [text, setText] = useDebouncedState('', 300);
  const [sortOrder, setSortOrder] = useState<sortOrderT>('descending');

  const { data, isLoading, isLoadingError, refetch, isFetching } = trpcClient.useQuery(
    ['photos.GetPhotosPaginated', { page, text: text.trim(), sortOrder }],
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
  if (isLoading || !data?.docs) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading photos. Try again later.</Text>;
  } else {
    contents = (
      <>
        <Grid>
          <PhotoGallery photos={data.docs} />
        </Grid>
        <Space h='xl' />
        <Center>
          <Stack align='center' spacing='xs'>
            <Text color='dimmed' size='sm'>
              {data.docs.length
                ? `Viewing photos ${data.pagingCounter} to ${
                    data.pagingCounter + data.docs.length - 1
                  } of ${data.totalDocs}`
                : 'No photos found'}
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
          <Title>Your photos</Title>
          <form onSubmit={handleEnter}>
            <TextInput
              icon={<IconSearch size={18} stroke={1.5} />}
              onChange={event => setText(event.currentTarget.value)}
              placeholder='Search your photos by caption'
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
            <SortedControl defaultValue={sortOrder} sortOrder={setSortOrder} />
          </form>
        </Stack>
        <Space h='xl' />
        {contents}
        <Space h='xl' />
      </Container>
    </>
  );
}
