import { Container, Divider, Grid, Image, Space, Stack, Title } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { ImageOverlayInfo } from '~components/image/ImageOverlayInfo';
import { ImageOverlayMetadata } from '~components/image/ImageOverlayMetadata';
import type { photoIdOnlyT } from '~types/photo/photo';

export function MemoryImageGrid() {
  //   const { data, isLoadingError, isLoading } = trpcClient.useQuery([
  //     'images.getImage',
  //     { _id: props._id },
  //   ]);

  //   if (isLoading || !data?.image) {
  //     return <div>Loading...</div>;
  //   }
  //   if (isLoadingError) {
  //     return <div>Error loading memory</div>;
  //   }

  //   data && console.log(data.image);

  return (
    <>
        <Space h='xl' />
        <Stack align='flex-start' justify='flex-start'>
          <Image
            alt=''
            height='40%'
            src='https://images.unsplash.com/photo-1663050005485-77458fefea02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=836&q=80'
            width='100%'
          />
          <Image
            alt=''
            height='40%'
            src='https://images.unsplash.com/photo-1663076128090-ca2a82da1a5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80'
            width='100%'
          />
          <Image
            alt=''
            height='40%'
            src='https://images.unsplash.com/photo-1663081692819-bcc628d5c9b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
            width='100%'
          />
          <Image
            alt=''
            height='40%'
            src='https://images.unsplash.com/photo-1663052666136-9f9409b2ff90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
            width='100%'
          />
        </Stack>
        <Space h='xl' />
        <Divider size='lg' />
    </>
  );
}
