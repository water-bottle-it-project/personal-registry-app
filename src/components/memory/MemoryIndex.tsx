import { Container, Grid, Space, Stack } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import type { photoIdOnlyT } from '~types/photo/photo';

import { MemoryHeader } from './MemoryHeader';
import { MemoryImage } from './MemoryImage';
import { MemoryImage2 } from './MemoryImage2';

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

  // What im trying to achieve:
  // Distribute images on the masonry grid evenly
  // My approach:
  // Every nth photo in the photos array, switch columns and populate that column
  // This is a very naive attempt and does not respect image order.
  let colCount = 1;
  const photoCol1: any[] = [];
  const photoCol2: any[] = [];
  const photoCol3: any[] = [];

  for (let i = 0; i < photos.length; i++) {
    if ((i - 1) % 2 == 0 && i !== 0) {
      switch (colCount) {
        case 1:
          colCount = 2;
          break;
        case 2:
          colCount = 3;
          break;
        case 3:
          colCount = 1;
          break;
      }
    }
    if (colCount === 1) {
      photoCol1.push(<MemoryImage2 _id={photos[i]._id} />);
    } else if (colCount === 2) {
      photoCol2.push(<MemoryImage2 _id={photos[i]._id} />);
    } else {
      photoCol3.push(<MemoryImage2 _id={photos[i]._id} />);
    }
  }

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
      {/* <Space h='xl' />
      {MemoryPhotos} */}
      <Space h='xl' />
      <Container size='xl'>
        <Grid>
          <Grid.Col lg={4} md={6}>
            <Stack align='flex-start' justify='flex-start' spacing='xs'>
              {photoCol1}
            </Stack>
          </Grid.Col>
          <Grid.Col lg={4} md={6}>
            <Stack align='flex-start' justify='flex-start' spacing='xs'>
              {photoCol2}
            </Stack>
          </Grid.Col>
          <Grid.Col lg={4} md={6}>
            <Stack align='flex-start' justify='flex-start' spacing='xs'>
              {photoCol3}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
