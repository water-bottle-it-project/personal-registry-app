import { Container, Grid, Skeleton, Space, Text } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { CollectionSkeleton } from '~components/collection/CollectionSkeleton';

import { TimelineGrid } from './TimelineGrid';
import { TimelineHeader } from './TimelineHeader';

export function TimelineIndex() {
  // Lift query hook up to share search bar state with the memory results.
  const { data, isLoading, isLoadingError } = trpcClient.useQuery(['memory.GetMemories']);

  let contents;
  if (isLoading || !data?.memories) {
    contents = (
      <Grid>
        {Array.from({ length: 12 }, (_, i) => (
          <Grid.Col key={i} md={3} sm={4} xs={6}>
            <Skeleton animate height={300} width='100%' />
          </Grid.Col>
        ))}
        ;
      </Grid>
    );
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
