import { ActionIcon, createStyles, Group, Image, Text, Tooltip } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconDownload } from '@tabler/icons';

import type { photoWithIdT } from '~types/photo/photo';

export function MemoryImageGrid({ caption, url }: photoWithIdT) {
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
          <Text className={classes.imgCaption} size='lg' weight={400}>
            {caption}
          </Text>
          <Tooltip label='Download'>
            <ActionIcon className={classes.imgDownload} variant='filled'>
              <IconDownload size={36} />
            </ActionIcon>
          </Tooltip>
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
    top: '-34px',
    left: '-12px',
    marginBottom: '-28px',
  },
  dimmed: {
    filter: 'brightness(70%)',
  },
}));
