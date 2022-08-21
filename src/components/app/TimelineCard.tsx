import { Anchor, Badge, Card, Group, Image, Text } from '@mantine/core';

export function TimelineCard() {
  return (
    <Card p='lg' radius='sm' shadow='sm' sx={{ maxWidth: 275 }} withBorder>
      <Card.Section>
        <Image
          alt='Norway'
          height={180}
          src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
        />
      </Card.Section>

      <Text mt='sm' size='xl' weight={600}>
        Swiss Alps
      </Text>

      <Text color='lightgrey' mb='xs' size='xs' weight={600}>
        2021-07-02
      </Text>

      <Text color='dimmed' size='sm'>
        A calm picturesque holiday with friends in Switzerland
      </Text>

      <Group mb='xs' mt='xl' position='left' spacing='sm'>
        <Badge color='gray' radius='sm' size='xs' variant='filled'>
          friends
        </Badge>
      </Group>

      <Anchor href='#' sx={{ fontSize: 12, fontWeight: 600 }}>
        View 3 photos
      </Anchor>
    </Card>
  );
}
