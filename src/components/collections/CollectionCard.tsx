import { Card, Group, Space, Text, Title } from '@mantine/core';

interface CollectionCardProps {
  title: string;
  description: string;
  userId: string;
  color: string;
  postCount: number;
}

export function CollectionCard(props: CollectionCardProps) {
  return (
    <Card
      p='md'
      radius='md'
      sx={theme => ({
        fontSize: theme.fontSizes.lg,
        width: 300,
        backgroundColor: theme.colors.blue[2],
      })}
      withBorder
    >
      <div>
        <Title order={3}>Gadgets</Title>
        <Space h='md' />
        <Text>Go go gadget dsadasdasd adasd asd asd as</Text>
      </div>
      <Space h='xl' />
      <div>
        <Group position='apart'>
          <Text>View 3 posts</Text>
          <Text color='red'>Edit</Text>
        </Group>
      </div>
    </Card>
  );
}
