import { Container, Grid, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { Key } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import type { photoIdOnlyT } from '~types/photo/photo';

import { MemoryHeader } from './MemoryHeader';
import { MemoryImage } from './MemoryImage';
import { MemoryImageGrid } from './MemoryImageGrid';
import { MemoryImageGrid2 } from './MemoryImageGrid2';

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
  const { title, collections, description, firstDate, lastDate, photos } = data.memory;

  const MemoryPhotos =
    photos && photos.map((c: photoIdOnlyT) => <MemoryImage _id={c._id} key={c._id} />);

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
      {/* <Container size='xl'>{photos && photos.map(c => <div>{c._id}</div>)}</Container> */}
      <Space h='xl' />
      {/* {MemoryPhotos} */}
      <Container size='xl'>
        <Grid>
          <Grid.Col span={4}>
            <MemoryImageGrid2 />
          </Grid.Col>
          <Grid.Col span={4}>
            <MemoryImageGrid />
          </Grid.Col>
          <Grid.Col span={4}>
            <MemoryImageGrid />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
