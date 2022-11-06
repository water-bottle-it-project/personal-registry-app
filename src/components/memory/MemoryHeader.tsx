import {
  Anchor,
  Badge,
  Box,
  Container,
  createStyles,
  Grid,
  Group,
  Space,
  Spoiler,
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
  photos,
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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      })}
    >
      <Container size='xl'>
        <Group position='apart'>
          <Title>{title}</Title>
          <LinkButton href={`/memory/${_id}/edit`} leftIcon={<IconEdit />}>
            Edit
          </LinkButton>
        </Group>
        <Space h='xs' />
        <Grid gutter='xs'>
          <Grid.Col xs={6}>
            <Title order={4} size='md'>
              Date range
            </Title>
            <Text>
              {firstDate === lastDate
                ? new Date(lastDate).toDateString()
                : `${new Date(firstDate).toDateString()} - ${new Date(lastDate).toDateString()}`}
            </Text>
          </Grid.Col>
          <Grid.Col xs={6}>
            <Title className={classes.right} order={4} size='md'>
              Created
            </Title>
            <Text className={classes.right}>{new ObjectID(_id).getTimestamp().toDateString()}</Text>
          </Grid.Col>
        </Grid>
        <Space h='xs' />
        <Title order={4} size='md'>
          Collections
        </Title>
        <Space h='xs' />
        <Group spacing='xs'>{collectionBadges}</Group>
        <Space h='xs' />
        {description && description.length > 0 && (
          <>
            <Title order={4} size='md'>
              Description
            </Title>
            {photos.length ? (
              <Spoiler hideLabel='Show less' maxHeight={200} showLabel='Show more'>
                <Text className={classes.description}>{description}</Text>
              </Spoiler>
            ) : (
              <Text className={classes.description}>{description}</Text>
            )}
          </>
        )}
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
