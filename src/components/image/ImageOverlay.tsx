import { Anchor, Badge, Box, Card, CloseButton, Grid, Group, Image, Text } from '@mantine/core';

interface TimelineCardProps {
  title: string;
  description: string;
  date: string;
  collections: string;
  photos: string;
}

export function ImageOverlay(props: TimelineCardProps) {
  return (
    <Card
      radius='sm'
      shadow='sm'
      sx={theme => ({
        // subscribe to color scheme changes
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        // or use any other static values from theme
        fontSize: theme.fontSizes.sm,
        width: '75%',
      })}
      withBorder
    >
      <Group position='right'>
        <CloseButton size='xl' title='Close popover' />
      </Group>

      <Card.Section px='10%' py='8%'>
        <Image
          alt='Norway'
          height='50%'
          src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
        />
      </Card.Section>

      <Text size='xl' weight={600}>
        The fking alps
      </Text>

      <Text color='dimmed' mb='xs' size='sm' weight={400}>
        Posted on {props.date}
      </Text>

      <Grid>
        <Grid.Col span={6}>
          <Box
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
              borderRadius: theme.radius.xs,
              padding: theme.spacing.xl,
            })}
          >
            <Text size='xl' weight={800}>
              Information
            </Text>
            <Text size='md' weight={600}>
              Title
            </Text>
            <Text size='md' weight={400}>
              alps btch
            </Text>
            <Text size='md' weight={600}>
              Date
            </Text>
            <Text size='md' weight={400}>
              August
            </Text>
            <Text size='md' weight={600}>
              Location
            </Text>
            <Text size='md' weight={400}>
              Here
            </Text>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
              textAlign: 'center',
              borderRadius: theme.radius.xs,
            })}
          >
            Box lets you add inline styles with sx prop
          </Box>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
