import { ActionIcon, createStyles, Group, Image, Text, Tooltip } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconDownload } from '@tabler/icons';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { ImageOverlayInfo } from '~components/image/ImageOverlayInfo';
import type { photoIdOnlyT } from '~types/photo/photo';

export function MemoryImageGrid(props: photoIdOnlyT) {
  const { hovered, ref } = useHover();
  const [info, setInfo] = useState(false);
  const { classes, cx } = useStyles();
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
    <div onClick={() => setInfo(!info)} ref={ref}>
      <Image
        alt={data?.image.caption}
        className={cx(classes.wrapper, { [classes.dimmed]: hovered === true })}
        height='40%'
        src={data?.image.url}
        width='100%'
      />
      {hovered && (
        <Group position='apart'>
          <Text className={classes.imgCaption} size='lg' weight={400}>
            {data?.image.caption}
          </Text>
          <Tooltip label='Download'>
            <ActionIcon className={classes.imgDownload} variant='filled'>
              <IconDownload size={36} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
      {info && (
        <ImageOverlayInfo
          _id={props._id}
          caption={data?.image.caption}
          url={data?.image.url}
          userId={data?.image.userId}
        />
      )}
    </div>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    cursor: 'zoom-in',
    transition: 'all 0.5s ease',
  },
  imgCaption: {
    color: 'white',
    position: 'relative',
    top: '-30px',
    right: '-12px',
    marginBottom: '-28px',
  },
  imgDownload: {
    color: 'white',
    position: 'relative',
    top: '-34px',
    left: '-12px',
    marginBottom: '-28px',
  },
  dimmed: {
    filter: 'brightness(70%)',
  },
}));
