import { ActionIcon, Container, Grid, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';

import { trpcClient } from '~clientUtils/trpcClient';
import { PhotoGallery } from '~components/photo/PhotoGallery';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function PhotosIndex() {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['photos.GetPhotos']);

  let contents;
  if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading photos. Try again later.</Text>;
  } else {
    contents = (
      <Grid>
        <PhotoGallery photos={data.photos} />
      </Grid>
    );
  }

  const memoryLinkBtns = Array.from(
    document.getElementsByClassName('pswp__button pswp__button--memoryLink'),
  );

  for (let i = 0; i < memoryLinkBtns.length; i++) {
    if (memoryLinkBtns[i]) {
      memoryLinkBtns[i].setAttribute('title', 'View Memory');
    }
  }

  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <Stack spacing='sm'>
          <Title>Your photos</Title>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            placeholder='Search your photos by caption'
            rightSection={
              <ActionIcon color='indigo' size={32} variant='filled'>
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
            rightSectionWidth={42}
            size='md'
          />
        </Stack>
        <Space h='xl' />
        {contents}
        <Space h='xl' />
      </Container>
    </>
  );
}
