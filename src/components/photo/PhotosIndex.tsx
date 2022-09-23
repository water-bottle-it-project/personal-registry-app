import { ActionIcon, Container, Grid, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';

import { trpcClient } from '~clientUtils/trpcClient';
import { PhotoCard } from '~components/photo/PhotoCard';
import { SkeletonGrid } from '~components/util/SkeletonGrid';

/**
 * Image page querying images from mongoDB
 * @constructor
 */

export function PhotosIndex() {
  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['images.listImages']);

  let contents;
  if (isLoading || !data) {
    contents = <SkeletonGrid />;
  } else if (isLoadingError) {
    contents = <Text>Error loading photos. Try again later.</Text>;
  } else {
    contents = (
      <Grid>
        {data.photos.map(p => (
          <Grid.Col key={p._id} md={3} sm={4} xs={6}>
            <PhotoCard {...p} />
          </Grid.Col>
        ))}
      </Grid>
    );
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
