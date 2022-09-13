import { Group, Skeleton, Space, Stack } from '@mantine/core';

export function CollectionFormSkeleton() {
  return (
    <>
      <Stack spacing='xs'>
        <Skeleton height={30} width={100} />
        <Skeleton height={35} width='100%' />
        <Skeleton height={30} width={100} />
        <Skeleton height={35} width='100%' />
        <Skeleton height={30} width={100} />
        <Skeleton height={80} width='100%' />
        <Space h='xl' />
        <Group position='apart'>
          <Skeleton height={35} width={70} />
          <Group>
            <Skeleton height={35} width={70} />
            <Skeleton height={35} width={70} />
          </Group>
        </Group>
      </Stack>
    </>
  );
}
