import { createStyles, Group, Image, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import type { photoWithIdT } from '~types/photo/photo';

export function MemoryImageGridItem({ caption, url, photoDate }: photoWithIdT) {
  const { hovered, ref } = useHover();
  const { classes, cx } = useStyles();

  return (
    <div ref={ref}>
      <Image
        alt={caption}
        className={cx(classes.wrapper, { [classes.dimmed]: hovered })}
        height='40%'
        src={url}
        width='100%'
      />
      {hovered && (
        <Group position='apart'>
          <div className={classes.text}>
            <Text className={classes.imgCaption} lineClamp={1} size='lg' weight={400}>
              {caption}
            </Text>
          </div>
          <div className={classes.text}>
            <Text className={classes.imgDownload} lineClamp={1} size='lg' weight={400}>
              {photoDate && new Date(photoDate).toDateString()}
            </Text>
          </div>
        </Group>
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
    top: '-30px',
    left: '-12px',
    marginBottom: '-28px',
  },
  dimmed: {
    filter: 'brightness(70%)',
  },
  text: {
    overflowWrap: 'break-word',
    maxWidth: '50%',
  },
}));
