import { Container, Space, Text } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

import { TimelineGrid } from './TimelineGrid';
import { TimelineHeader } from './TimelineHeader';

export function TimelineIndex() {
  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError } = trpcClient.useQuery(['memory.GetMemories']);

  let contents;
  if (isLoading || !data?.memories) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading memories. Try again later.</Text>;
  } else {
    contents = <TimelineGrid memories={data.memories} />;
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
