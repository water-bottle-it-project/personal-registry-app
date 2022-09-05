import { Skeleton, Stack } from '@mantine/core';

export function CollectionSkeleton() {
  return (
    <>
      <Stack align='center'>
        <Skeleton height={150} width={298} />
      </Stack>
    </>
  );
}
