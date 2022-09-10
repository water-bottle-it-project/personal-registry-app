import { Badge, Grid, Text } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';

export function TimelineTag({ collectionId }: { collectionId: string }) {
  const { data } = trpcClient.useQuery(['collection.GetCollection', { _id: collectionId }]);
  const { color, title } = data?.collection || { color: '', title: '' };

  return (
    <>
      <Grid.Col span={4}>
        <Badge color={color} radius='sm' size='xs' variant='filled'>
          <Text>{title}</Text>
        </Badge>
      </Grid.Col>
    </>
  );
}
