import {
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import ObjectID from 'bson-objectid';
import Link from 'next/link';

import { LinkButton } from '~components/util/LinkButton';
import type { memoryWithPhotosT } from '~types/memory/memoryForm';

export function MemoryHeader({
  _id,
  title,
  collections,
  description,
  firstDate,
  lastDate,
}: memoryWithPhotosT) {
  const { classes } = useStyles();

  const collectionBadges = collections.map(c => (
    <Badge color={c.color} key={c._id}>
      <Link href={`/collections/${c._id}`} passHref>
        <Anchor component='a' variant='text'>
          {c.title}
        </Anchor>
      </Link>
    </Badge>
  ));

  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      })}
    >
      <Container size='xl'>
        <Group position='apart'>
          <Title>{title}</Title>
          <LinkButton href={`/memory/${_id}/edit`} rightIcon={<IconEdit />}>
            Edit
          </LinkButton>
        </Group>
        <Space h='xs' />
        <Grid gutter='xs'>
          <Grid.Col xs={6}>
            <Title order={4} size='md'>
              Date range
            </Title>
            <Text size='sm'>
              {firstDate === lastDate
                ? new Date(lastDate).toDateString()
                : `${new Date(firstDate).toDateString()} - ${new Date(lastDate).toDateString()}`}
            </Text>
          </Grid.Col>
          <Grid.Col xs={6}>
            <Title className={classes.right} order={4} size='md'>
              Created
            </Title>
            <Text className={classes.right} size='sm'>
              {new ObjectID(_id).getTimestamp().toDateString()}
            </Text>
          </Grid.Col>
        </Grid>
        <Space h='xs' />
        <Title order={4} size='md'>
          Collections
        </Title>
        <Group spacing='xs'>{collectionBadges}</Group>
        <Space h='xs' />
        <Title order={4} size='md'>
          Description
        </Title>
        <Text className={classes.description}>{description}</Text>
      </Container>
    </Box>
  );
}

const useStyles = createStyles(theme => ({
  right: {
    [theme.fn.largerThan('xs')]: {
      textAlign: 'right',
    },
  },

  description: {
    whiteSpace: 'pre-wrap',
  },
}));
