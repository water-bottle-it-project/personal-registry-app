import { Grid } from '@mantine/core';

import { TimelineCard } from '~components/timeline/TimelineCard';
import type { memoryCardT } from '~types/memory/memoryForm';

interface TimelineGridProps {
  memories: memoryCardT[];
}

/**
 * Re-use in memories view and collection memories view.
 * @param memories
 * @constructor
 */
export function TimelineGrid({ memories }: TimelineGridProps) {
  return (
    <Grid>
      {memories.map(m => (
        <Grid.Col key={m._id} md={3} sm={4} xs={6}>
          <TimelineCard {...m} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
