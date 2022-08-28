import { Box, Card, Grid, Image, Text } from '@mantine/core';

interface ImageCardProps {
  caption: string;
  url: string;
  userId: string;
}

export function ImageOverlay(props: ImageCardProps) {
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
        alignSelf: 'centre',
      })}
      withBorder
    >
      <Card.Section px='10%' py='8%'>
        <Image alt='' height='50%' src={props.url} />
      </Card.Section>

      <Text size='xl' weight={600}>
        {props.caption}
      </Text>

      <Text color='dimmed' mb='xs' size='sm' weight={400}>
        Posted on
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
              {props.caption}
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
