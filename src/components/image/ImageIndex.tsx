import { Box, Button, Group, Overlay, SimpleGrid } from '@mantine/core';
import type { Key } from 'react';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageCard } from './ImageCard';

function Demo() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Box sx={{ height: 100, position: 'relative' }}>
        {visible && <Overlay color='#000' opacity={0.6} zIndex={5} />}
        <Button color={visible ? 'red' : 'teal'}>
          {!visible ? 'Click as much as you like' : "Won't click, haha"}
        </Button>
      </Box>

      <Group position='center'>
        <Button onClick={() => setVisible(v => !v)}>Toggle overlay</Button>
      </Group>
    </>
  );
}
/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function ImagesIndex() {
  const allUsers = trpcClient.useQuery(['images.listImages']);

  const [visible, setVisible] = useState(false);

  const Images =
    allUsers.data &&
    allUsers.data.photos.map(
      (photo: { caption: string; id: Key | null | undefined; url: string; userId: string }) => (
        <ImageCard caption={photo.caption} key={photo.id} url={photo.url} userId={photo.userId} />
      ),
    );

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'xl', cols: 3, spacing: 'md' },
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'xs', cols: 1, spacing: 'xs' },
        ]}
        cols={4}
        spacing='xs'
      >
        {Images}
      </SimpleGrid>
      <Box sx={{ height: 100, position: 'relative' }}>
        {visible && <Overlay color='#000' opacity={0.6} zIndex={5} />}
        <Button color={visible ? 'red' : 'teal'}>
          {!visible ? 'Click as much as you like' : "Won't click, haha"}
        </Button>
      </Box>
      <Group position='center'>
        <Button onClick={() => setVisible(v => !v)}>Toggle overlay</Button>
      </Group>
      );
    </>
  );
}
