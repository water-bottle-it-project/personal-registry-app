import { Container } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';

import { MemoryHeader } from './MemoryHeader';

interface MemoryIndexProps {
  _id: string;
}

export function MemoryIndex(props: MemoryIndexProps) {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery([
    'memory.GetMemory',
    { _id: props._id },
  ]);
  if (isLoading || !data?.memory) {
    return <div>Loading...</div>;
  }
  if (isLoadingError) {
    return <div>Error loading memory</div>;
  }
  const { title, description, firstDate, lastDate, photos, collections } = data.memory;
  return (
    <>
      <MemoryHeader
        _id={props._id}
        collections={collections}
        description={description}
        firstDate={firstDate}
        lastDate={lastDate}
        photos={photos}
        title={title}
      />
      <Container size='xl'>{/* Insert images here */}</Container>
    </>
  );
}
