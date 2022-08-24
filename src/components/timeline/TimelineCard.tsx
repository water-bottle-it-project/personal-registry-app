import { Anchor, Badge, Card, Grid, Image, Text } from '@mantine/core';

/**
 * collections and photos will be list array which we can change when actually passing in
 * the objects, unsure about if we will pass the date as string in the prop or convert to
 * string within the component, just keeping it like this for now, will pass in the url
 * of the image as well when it comes to it, instead of using unsplash
 */
interface TimelineCardProps {
  title: string;
  description: string;
  date: string;
  collections: string;
  photos: string;
}

export function TimelineCard(props: TimelineCardProps) {
  return (
    <Card
      p='lg'
      radius='sm'
      shadow='sm'
      sx={theme => ({
        // subscribe to color scheme changes
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        // or use any other static values from theme
        fontSize: theme.fontSizes.sm,
        width: 275,
      })}
      withBorder
    >
      <Card.Section>
        <Image
          alt='Norway'
          height={180}
          src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
        />
      </Card.Section>

      <Text mt='sm' size='xl' weight={600}>
        {props.title}
      </Text>

      <Text color='dimmed' mb='xs' size='xs' weight={600}>
        {props.date}
      </Text>

      <Text color='light' size='sm'>
        {props.description}
      </Text>

      <Grid mb='xs' mt='lg'>
        <Grid.Col span={4}>
          <Badge color='gray' radius='sm' size='xs' variant='filled'>
            {props.collections}
          </Badge>
        </Grid.Col>
      </Grid>

      <Anchor href='#' sx={{ fontSize: 14, fontWeight: 600 }}>
        View {props.photos} photos
      </Anchor>
    </Card>
  );
}
