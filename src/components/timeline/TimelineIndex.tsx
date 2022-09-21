import { Center, Container, Pagination, Space, Stack, Text } from '@mantine/core';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineGrid } from '~components/timeline/TimelineGrid';
import { TimelineHeader } from '~components/timeline/TimelineHeader';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

export function TimelineIndex() {
  const [page, setPage] = useState(1);

  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError } = trpcClient.useQuery([
    'memory.GetMemoriesPaginated',
    { page },
  ]);

  let contents;
  if (isLoading || !data?.docs) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading memories. Try again later.</Text>;
  } else {
    contents = (
      <>
        <Center>
          <Pagination onChange={setPage} page={page} siblings={2} total={data.totalPages} />
        </Center>
        <Space h='sm' />
        <TimelineGrid memories={data.docs} />
        <Space h='xl' />
        <Center>
          <Stack align='center' spacing='xs'>
            <Text color='dimmed' size='sm'>
              Viewing memories {data.pagingCounter} to {data.pagingCounter + data.limit - 1}
            </Text>
            <Pagination onChange={setPage} page={page} siblings={2} total={data.totalPages} />
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
