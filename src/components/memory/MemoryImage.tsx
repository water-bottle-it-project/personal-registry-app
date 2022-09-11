import { Container, Divider, Grid, Image, Space, Title } from '@mantine/core';

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

  data && console.log(data.image);

  return (
    <>
      <Container size='xl'>
        <Divider size='lg' />
        <Space h='xl' />
        <Grid>
          <Grid.Col span={8}>
            <Image alt='' height='40%' src={data?.image.url} width='100%' />
            <Space h='md' />
            <Title order={1}>{data?.image.caption}</Title>
          </Grid.Col>
          <Grid.Col span={4}>
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
          </Grid.Col>
        </Grid>
        <Space h='xl' />
      </Container>
    </>
  );
}
