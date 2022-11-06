import {
  ActionIcon,
  Button,
  Center,
  CloseButton,
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
import { IconArrowRight, IconPlus, IconSearch } from '@tabler/icons';
import { useAtom, useAtomValue } from 'jotai';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect } from 'react';

import { memoriesSearchAtom, memoriesSortAtom } from '~clientUtils/atoms';
import { trpcClient } from '~clientUtils/trpcClient';
import { usePage } from '~clientUtils/usePage';
import { AllMemoriesGrid } from '~components/allMemories/AllMemoriesGrid';
import errorLottie from '~components/util/error-lottie.json';
import { LinkButton } from '~components/util/LinkButton';
import { SkeletonGrid } from '~components/util/SkeletonGrid';
import { SortedControl } from '~components/util/SortedControl';

export function AllMemoriesIndex() {
  const router = useRouter();
  const page = usePage();
  const currentText = useAtomValue(memoriesSearchAtom.currentValueAtom);
  const [debouncedText, setText] = useAtom(memoriesSearchAtom.debouncedValueAtom);
  const [sortOrder, setSortOrder] = useAtom(memoriesSortAtom);

  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError, refetch, isFetching, error } = trpcClient.useQuery(
    ['memory.GetMemoriesPaginated', { page, text: debouncedText.trim(), sortOrder }],
    { keepPreviousData: true },
  );

  // console.log('rendered');

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
  if (isLoadingError) {
    contents = (
      <Stack align='center' justify='center'>
        <Space h='md' />
        <Lottie animationData={errorLottie} loop={false} style={{ width: '50%', maxWidth: 180 }} />
        <Text align='center'>Error loading memories view: {error?.message}</Text>
        <LinkButton gradient={{ from: 'indigo', to: 'cyan' }} href='/' size='md' variant='gradient'>
          Back to homepage
        </LinkButton>
        <Text align='center'>
          Memories will be automatically refetched without reloading when you refocus the window or
          tab. You can also reload the page.
        </Text>
      </Stack>
    );
  } else if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else {
    contents = (
      <>
        <AllMemoriesGrid memories={data.docs} />
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
          <Group position='apart'>
            <Title order={1}>Your memories</Title>
            <Link href='/create' passHref>
              <Button component='a' leftIcon={<IconPlus />}>
                Create
              </Button>
            </Link>
          </Group>
          <form onSubmit={handleEnter}>
            <TextInput
              icon={<IconSearch size={18} stroke={1.5} />}
              onChange={event => setText(event.currentTarget.value)}
              placeholder='Search your memories by title and description'
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
            <Space h='xs' />
            <SortedControl
              defaultValue={sortOrder}
              highlight={!!currentText.trim()}
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
