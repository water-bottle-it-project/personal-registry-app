import { Card, createStyles, Image, Space, Text } from '@mantine/core';
import type { MouseEvent, MutableRefObject } from 'react';

import type { photoWithIdT } from '~types/photo/photo';

interface PhotoCardProps extends photoWithIdT {
  itemRef?: MutableRefObject<HTMLDivElement>;
  open?: (e: MouseEvent) => void;
}

export function PhotoCard({ _id, caption, url, itemRef, open }: PhotoCardProps) {
  const { classes } = useStyles();
  return (
    <Card
      radius='sm'
      shadow='sm'
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        height: '100%',
      })}
      withBorder
    >
      <Card.Section className={classes.cardSection}>
        <Image alt={caption} height={220} onClick={open} ref={itemRef} src={url} />
      </Card.Section>
      <Space h='sm' />
      <Text align='center' color={caption ? 'gray.4' : 'dimmed'} italic={!caption}>
        {caption || 'no caption'}
      </Text>
    </Card>
  );
}

const useStyles = createStyles({
  cardSection: {
    cursor: 'pointer',
  },
});
