import { Anchor, Card, Container, createStyles, Group, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';

interface CollectionCardProps {
  title: string;
  description: string;
  userId: string;
  color: string;
  postCount: number;
}

export function CollectionCard(props: CollectionCardProps) {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper}>
      <Card
        p='md'
        radius='md'
        sx={theme => ({
          fontSize: theme.fontSizes.lg,
          width: 300,
          color: theme.colors.gray,
          backgroundColor: theme.colors[props.color][2],
        })}
        withBorder
      >
        <div>
          <Title order={3}>{props.title}</Title>
          <Space h='md' />
          <Text>{props.description}</Text>
        </div>
        <Space h='xl' />
        <div>
          <Group position='apart'>
            <Link href='/'>
              <Anchor>
                <Text>View {props.postCount} posts</Text>
              </Anchor>
            </Link>
            <Link href='/'>
              <Anchor>
                <Text color='red'>Edit</Text>
              </Anchor>
            </Link>
          </Group>
        </div>
      </Card>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    justifyContent: 'center',
  },
}));
