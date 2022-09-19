import { Container, Grid, Space, Text } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';

import { TimelineGrid } from './TimelineGrid';
import { TimelineHeader } from './TimelineHeader';

export function TimelineIndex() {
  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError } = trpcClient.useQuery(['memory.GetMemories']);

  let contents;
  if (isLoading || !data?.memories) {
    contents = <Text>Loading memories...</Text>;
  } else if (isLoadingError) {
    contents = <Text>Error loading memories. Try again later.</Text>;
  } else {
    contents = <TimelineGrid memories={data.memories} />;
    console.log(data.memories);
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
