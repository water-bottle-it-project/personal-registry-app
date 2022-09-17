import { Divider, Grid, Image, Space, Stack, Title } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { ImageOverlayInfo } from '~components/image/ImageOverlayInfo';
import { ImageOverlayMetadata } from '~components/image/ImageOverlayMetadata';
import type { photoIdOnlyT } from '~types/photo/photo';

export function MemoryImage(props: photoIdOnlyT) {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery([
    'images.getImage',
    { _id: props._id },
  ]);

  if (isLoading || !data?.image) {
    return <div>Loading...</div>;
  }
  if (isLoadingError) {
    return <div>Error loading memory</div>;
  }

  return (
    <>
      <Grid justify='center'>
        <Grid.Col lg={8} md={8}>
          <Image alt='' height='40%' src={data?.image.url} width='100%' />
          <Space h='md' />
          <Title order={1}>{data?.image.caption}</Title>
        </Grid.Col>
        <Grid.Col lg={4} md={8}>
          <Stack spacing='xs'>
            <ImageOverlayInfo
              _id={props._id}
              caption={data?.image.caption}
              url={data?.image.url}
              userId={data?.image.userId}
            />
            <Space h='md' />
            <ImageOverlayMetadata
              caption={data?.image.caption}
              url={data?.image.url}
              userId={data?.image.userId}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Space h='xl' />
      <Divider size='lg' />
    </>
  );
}
