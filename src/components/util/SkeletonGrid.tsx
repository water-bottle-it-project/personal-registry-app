import { Grid, Skeleton } from '@mantine/core';

export function SkeletonGrid() {
  return (
    <Grid>
      {Array.from({ length: 12 }, (_, i) => (
        <Grid.Col key={i} md={3} sm={4} xs={6}>
          <Skeleton animate height={300} width='100%' />
        </Grid.Col>
      ))}
      ;
    </Grid>
  );
}
