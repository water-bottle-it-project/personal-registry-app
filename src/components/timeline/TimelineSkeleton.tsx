import { Skeleton, Stack } from '@mantine/core';

export function TimelineSkeleton() {
  return (
    <>
      <Stack align='center'>
        <Skeleton height={384} width={273} />
      </Stack>
    </>
  );
}
