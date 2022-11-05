import {
  ActionIcon,
  Center,
  CloseButton,
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
import { IconArrowRight, IconSearch } from '@tabler/icons';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect } from 'react';

import { photosSearchAtom, photosSortAtom } from '~clientUtils/atoms';
import { trpcClient } from '~clientUtils/trpcClient';
import { usePage } from '~clientUtils/usePage';
import { PhotoGallery } from '~components/photo/PhotoGallery';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import { SortedControl } from '~components/util/SortedControl';

/**
 * Photos page querying images from MongoDB
 * @constructor
 */
export function PhotosIndex() {
  const router = useRouter();
  const page = usePage();
  const currentText = useAtomValue(photosSearchAtom.currentValueAtom);
  const [debouncedText, setText] = useAtom(photosSearchAtom.debouncedValueAtom);
  const [sortOrder, setSortOrder] = useAtom(photosSortAtom);

  const { data, isLoading, isLoadingError, refetch, isFetching, dataUpdatedAt } =
    trpcClient.useQuery(
      ['photos.GetPhotosPaginated', { page, text: debouncedText.trim(), sortOrder }],
      {
        keepPreviousData: true,
      },
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

  console.log(dataUpdatedAt);

  let contents;
  if (isLoading || !data?.docs) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading photos. Try again later.</Text>;
  } else {
    contents = (
      <>
        <Grid>
          <PhotoGallery key={dataUpdatedAt + sortOrder} photos={data.docs} />
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
                <Group position='right' pr={5} spacing={5}>
                  <CloseButton onClick={() => setText('')} />
                  <ActionIcon color='indigo' onClick={() => refetch()} size={32} variant='filled'>
                    {isFetching ? (
                      <Loader color='white' size='xs' variant='dots' />
                    ) : (
                      <IconArrowRight size={18} stroke={1.5} />
                    )}
                  </ActionIcon>
                </Group>
              }
              rightSectionWidth={70}
              size='md'
              value={currentText}
            />
            <Space h='xs' />
            <SortedControl
              defaultValue={sortOrder}
              highlight={!!debouncedText.trim()}
              onChangeSortOrder={setSortOrder}
            />
          </form>
        </Stack>
        <Space h='xl' />
        {contents}
        <Space h='xl' />
      </Container>
    </>
  );
}
