import { Anchor, Card, createStyles, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

import type { collectionT } from '~types/collection/collection';

interface CollectionCardProps extends collectionT {
  postCount?: number;
}

export function CollectionCard({ _id, description, title, color }: CollectionCardProps) {
  const { classes } = useStyles();

  return (
    <Card
      sx={theme => ({
        height: '100%',
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors[color][5] : theme.colors[color][2],
        // Sort of a trick to darken the card in dark mode
        boxShadow: theme.colorScheme === 'dark' ? 'inset 0px 0px 0 2000px rgba(0,0,0,0.7)' : '0',
      })}
    >
      <Stack spacing='xs' sx={{ height: '100%' }}>
        <Title className={classes.text} lineClamp={3} order={4}>
          {title}
        </Title>
        <Text
          className={classes.text}
          italic={!description}
          lineClamp={5}
          size='sm'
          sx={{ flexGrow: 1 }}
        >
          {description || 'no description provided'}
        </Text>
        <Group position='apart'>
          <Link href={`/collections/${_id}`} passHref>
            <Anchor component='a'>
              <Text>View memories</Text>
            </Anchor>
          </Link>
          <Link
            as={`/collections/edit?id=${_id}`}
            href={`/collections?edit=${_id}`}
            passHref
            shallow
          >
            <Anchor color='red' component='a'>
              <Text>Edit</Text>
            </Anchor>
          </Link>
        </Group>
      </Stack>
    </Card>
  );
}

const useStyles = createStyles({
  text: {
    overflowWrap: 'break-word',
  },
});
