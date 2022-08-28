import { Skeleton, Stack } from '@mantine/core';

export function ImageSkeleton() {
  return (
    <>
      <Stack align='center'>
        <Skeleton height={200} width={298} />
        <Skeleton height={27.89} width={200} />
      </Stack>
    </>
  );
}
