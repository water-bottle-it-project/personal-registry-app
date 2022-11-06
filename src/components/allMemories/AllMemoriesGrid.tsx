import { Grid } from '@mantine/core';

import { AllMemoriesCard } from '~components/allMemories/AllMemoriesCard';
import type { memoryCardT } from '~types/memoryT';

interface AllMemoriesGridProps {
  memories: memoryCardT[];
}

/**
 * Re-use in memories view and collection memories view.
 * @param memories
 * @constructor
 */
export function AllMemoriesGrid({ memories }: AllMemoriesGridProps) {
  return (
    <Grid>
      {memories.map(m => (
        <Grid.Col key={m._id} md={3} sm={4} xs={6}>
          <AllMemoriesCard {...m} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
