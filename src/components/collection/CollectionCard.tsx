import { Anchor, Card, Group, Overlay, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';

import type { collectionT } from '~types/collection/collection';

interface CollectionCardProps extends collectionT {
  postCount?: number;
}

export function CollectionCard({ _id, description, title, color }: CollectionCardProps) {
  return (
    <Card
      sx={theme => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors[color][6] : theme.colors[color][1],
        boxShadow: theme.colorScheme === 'dark' ? 'inset 0px 0px 0 2000px rgba(0,0,0,0.6)' : '0',
      })}
    >
      <Title order={4}>{title}</Title>
      <Space h='sm' />
      <Text lineClamp={4}>{description}</Text>
      <Group position='apart'>
        <Link href='/'>
          <Anchor>
            <Text>View posts</Text>
          </Anchor>
        </Link>
      </Group>
    </Card>
  );
}
