import { Anchor, Card, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

import type { collectionT } from '~types/collection/collection';

interface CollectionCardProps extends collectionT {
  postCount?: number;
}

export function CollectionCard({ _id, description, title, color }: CollectionCardProps) {
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
        <Title order={4}>{title}</Title>
        <Text lineClamp={4} size='sm' sx={{ flexGrow: 1 }}>
          {description}
        </Text>
        <Group position='apart'>
          <Link href='/'>
            <Anchor>
              <Text>View posts</Text>
            </Anchor>
          </Link>
        </Group>
      </Stack>
    </Card>
  );
}
