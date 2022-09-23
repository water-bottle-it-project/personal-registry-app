import { Divider, Grid, Image, Space, Stack, Title } from '@mantine/core';

import { PhotoInfo } from '~components/photo/PhotoInfo';
import { PhotoMeta } from '~components/photo/PhotoMeta';
import type { photoWithIdT } from '~types/photo/photo';

export function MemoryImage({ _id, caption, url, photoDate, location }: photoWithIdT) {
  return (
    <>
      <Grid justify='center'>
        <Grid.Col lg={8} md={8}>
          <Image alt={caption} height='40%' src={url} width='100%' />
          <Space h='md' />
          <Title order={1}>{caption}</Title>
        </Grid.Col>
        <Grid.Col lg={4} md={8}>
          <Stack spacing='xs'>
            <PhotoInfo _id={_id} caption={caption} url={url} />
            <Space h='md' />
            <PhotoMeta caption={caption} url={url} />
          </Stack>
        </Grid.Col>
      </Grid>
      <Space h='sm' />
      <Divider size='sm' />
      <Space h='sm' />
    </>
  );
}
