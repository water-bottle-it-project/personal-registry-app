import { Grid, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';

import { trpcClient } from '~clientUtils/trpcClient';
import { TimelineCard } from '~components/timeline/TimelineCard';
import { TimelineSkeleton } from '~components/timeline/TimelineSkeleton';

export function TimelineGrid() {
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery(['memory.GetMemories']);
  if (isLoading) {
    // Need to provide a key for React components when mapping over an array (check devtools console).
    // Use same grid as the data grid to have consistent sizing.
    const skeletonLoaders = Array.from({ length: 10 }, (_, i) => (
      <Grid.Col key={i} md={3} sm={4} xs={6}>
        <TimelineSkeleton />
      </Grid.Col>
    ));

    return <Grid>{skeletonLoaders}</Grid>;
  }
  if (isLoadingError) {
    showNotification({
      color: 'red',
      icon: <IconX />,
      title: 'Error!',
      message: 'An error occurred while loading memories.',
    });
    return <Text>Error loading collections: {error?.message}</Text>;
  }
  const sortedMemories =
    data &&
    data.memories.sort((a, b) => new Date(a.firstDate).getTime() - new Date(b.firstDate).getTime());
  const memories =
    sortedMemories &&
    sortedMemories.map(c => (
      <Grid.Col key={c._id} md={3} sm={4} xs={6}>
        <TimelineCard
          _id={c._id}
          collections={c.collections}
          description={c.description ? c.description : ''}
          firstDate={new Date(c.firstDate)}
          lastDate={new Date(c.lastDate)}
          photos={c.photos}
          title={c.title}
        />
      </Grid.Col>
    ));
  return <Grid>{memories}</Grid>;
}
