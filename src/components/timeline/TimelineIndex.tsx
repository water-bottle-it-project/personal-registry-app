import { Center, Container, Pagination, Space, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineGrid } from '~components/timeline/TimelineGrid';
import { TimelineHeader } from '~components/timeline/TimelineHeader';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

export function TimelineIndex() {
  const router = useRouter();
  const pageNum = router.query.page;

  // Set the initial page based on the page query param.
  const [page, setPage] = useState<number>(() => {
    // Check for positive integer only.
    const x = Number(pageNum);
    if (Number.isInteger(x) && x > 0) {
      return x;
    }
    void router.push({ pathname: '' }, undefined, { shallow: true });
    return 1;
  });

  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError } = trpcClient.useQuery([
    'memory.GetMemoriesPaginated',
    { page },
  ]);

  // Need useCallback. Without it, useEffect runs on every render:
  // "Function makes the dependencies of useEffect Hook change on every render"
  const changePage = useCallback(
    async (newPage: number) => {
      setPage(newPage);
      await router.push(
        {
          pathname: '',
          query: newPage === 1 ? {} : { page: newPage },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  useEffect(() => {
    // We only know the pages once the data is loaded.
    // If the page is more than the total number of pages, go to the last page.
    if (data && page > data.totalPages) {
      changePage(data.totalPages).then(() => {
        return;
      });
    }
  }, [changePage, data, page]);

  let contents;
  if (isLoading || !data?.docs) {
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
              Viewing memories {data.pagingCounter} to {data.pagingCounter + data.docs.length - 1}{' '}
              of {data.totalDocs}
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
        <Space h='xl' />
      </>
    );
  }

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <TimelineHeader />
        <Space h='xl' />
        {contents}
      </Container>
    </>
  );
}
