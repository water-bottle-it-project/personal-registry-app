import { Divider, Grid, Image, Space, Stack } from '@mantine/core';

import { PhotoMeta } from '~components/photo/PhotoMeta';
import type { photoWithIdT } from '~types/photo/photo';

interface MemoryImageProps extends photoWithIdT {
  index: number;
  total: number;
}

export function MemoryImage({
  _id,
  caption,
  url,
  photoDate,
  location,
  width,
  height,
  index,
  total,
}: MemoryImageProps) {
  return (
    <>
      <Grid justify='center'>
        <Grid.Col lg={8} md={8}>
          <Image alt={caption} height='40%' src={url} width='100%' />
          <Space h='md' />
        </Grid.Col>
        <Grid.Col lg={4} md={8}>
          <Stack spacing='xs'>
            <PhotoMeta
              caption={caption}
              height={height}
              index={index}
              location={location}
              photoDate={photoDate}
              total={total}
              url={url}
              width={width}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Space h='sm' />
      <Divider size='sm' />
      <Space h='sm' />
    </>
  );
}
