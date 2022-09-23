import { Card, createStyles, Image, Space, Text } from '@mantine/core';
import Link from 'next/link';

import type { photoWithIdT } from '~types/photo/photo';

export function PhotoCard({ _id, caption, url }: photoWithIdT) {
  const { classes } = useStyles();
  return (
    <Card
      className={classes.card}
      radius='sm'
      shadow='sm'
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        height: '100%',
      })}
      withBorder
    >
      <Card.Section>
        <Link as={`/images/${_id}`} href={`/images/?id=${_id}`} shallow>
          <Image alt={caption} height={220} src={url} />
        </Link>
      </Card.Section>
      <Space h='sm' />
      <Text align='center' color={caption ? 'gray.4' : 'dimmed'} italic={!caption}>
        {caption || 'no caption'}
      </Text>
    </Card>
  );
}

const useStyles = createStyles({
  card: {
    cursor: 'pointer',
  },
});
