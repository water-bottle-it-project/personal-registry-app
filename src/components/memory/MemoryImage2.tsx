import { Container, createStyles, Divider, Grid, Image, Space, Stack, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import { trpcClient } from '~clientUtils/trpcClient';
import type { photoIdOnlyT } from '~types/photo/photo';

export function MemoryImage2(props: photoIdOnlyT) {
  const { hovered, ref } = useHover();
  const { classes } = useStyles();
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
    <div ref={ref}>
      <Image alt='' height='40%' src={data?.image.url} width='100%' />
      {hovered && (
        <Title className={classes.imgInfo} order={4}>
          {data?.image.caption}
        </Title>
      )}
    </div>
  );
}

const useStyles = createStyles(theme => ({
  imgContainer: {
    height: 'max-content',
  },
  imgInfo: {
    color: 'white',
    position: 'relative',
    top: '-20px',
  },
}));
