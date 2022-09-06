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
        <Text italic={!description} lineClamp={4} size='sm' sx={{ flexGrow: 1 }}>
          {description ? description : 'no description provided'}
        </Text>
        <Group position='apart'>
          <Link href='/' passHref>
            <Anchor component='a'>
              <Text>View memories</Text>
            </Anchor>
          </Link>
          <Link as={`/collections/edit?id=${_id}`} href={`/collections?edit=${_id}`} passHref>
            <Anchor color='red' component='a'>
              <Text>Edit</Text>
            </Anchor>
          </Link>
        </Group>
      </Stack>
    </Card>
  );
}
