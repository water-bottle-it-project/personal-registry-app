import { Card, Divider, Grid, Image, Space, Stack } from '@mantine/core';

import { PhotoMeta } from '~components/photo/PhotoMeta';
import type { photoWithIdT } from '~types/photo/photo';

interface MemoryPhotoProps extends photoWithIdT {
  index: number;
  total: number;
}

export function MemoryPhoto({
  caption,
  url,
  photoDate,
  location,
  width,
  height,
  index,
  total,
}: MemoryPhotoProps) {
  return (
    <>
      <Grid justify='center'>
        <Grid.Col lg={8} md={8}>
          <Card>
            <Card.Section>
              <Image alt={caption} height='40%' src={url} width='100%' />
            </Card.Section>
          </Card>
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
      <Divider size='xs' variant='dotted' />
      <Space h='sm' />
    </>
  );
}
