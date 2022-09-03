import { Anchor, Card, Container, createStyles, Group, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';

interface CollectionCardProps {
  title: string;
  description: string;
  userId: string;
  color: string;
  postCount: number;
  openModal: (
    title: string,
    desc: string,
    userId: string,
    color: string,
    value: boolean | ((prevState: boolean) => boolean),
  ) => void;
}

export function CollectionCard({
  color,
  description,
  postCount,
  title,
  userId,
  openModal,
}: CollectionCardProps) {
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
          backgroundColor: theme.colors[color][2],
        })}
        withBorder
      >
        <div>
          <Title order={3}>{title}</Title>
          <Space h='md' />
          <Text>{description}</Text>
        </div>
        <Space h='xl' />
        <div>
          <Group position='apart'>
            <Link href='/'>
              <Anchor>
                <Text>View {postCount} posts</Text>
              </Anchor>
            </Link>
            <Anchor onClick={() => openModal(title, description, userId, color, true)}>
              <Text color='red'>Edit</Text>
            </Anchor>
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
