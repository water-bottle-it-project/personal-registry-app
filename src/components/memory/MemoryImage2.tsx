import { createStyles, Image, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { ImageOverlayInfo } from '~components/image/ImageOverlayInfo';
import type { photoIdOnlyT } from '~types/photo/photo';

export function MemoryImage2(props: photoIdOnlyT) {
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
        <Text className={classes.imgCaption} size='lg' weight={400}>
          {data?.image.caption}
        </Text>
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
    right: '-15px',
    marginBottom: '-26px',
  },
  dimmed: {
    filter: 'brightness(70%)',
  },
}));
