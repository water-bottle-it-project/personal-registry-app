import {
  BackgroundImage,
  Button,
  Container,
  createStyles,
  Grid,
  SimpleGrid,
  Space,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconFolders, IconPhoto, IconSearch, IconTag } from '@tabler/icons';

export function FeaturesTitle() {
  const { classes } = useStyles();

  const items = features.map(feature => (
    <div key={feature.title}>
      <ThemeIcon color={feature.color} radius='md' size={44}>
        <feature.icon size={26} stroke={1.8} />
      </ThemeIcon>
      <Title className={classes.heading} mt='sm' order={3}>
        {feature.title}
      </Title>
      <Text className={classes.description} color='dimmed' size='sm'>
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <BackgroundImage src='/gradient.png'>
      <Container px={0} size='xl'>
        <Grid gutter={30} m={0} px={0} py={30}>
          <Grid.Col md={5} span={12}>
            <Title className={classes.title} order={2}>
              Manage your memories like no other way
            </Title>
            <Text className={classes.description}>
              We offer rich features to properly store and manage your precious photos and memories.
              <Space h='md' />
              You can add textual descriptions and photos to your memories with metadata, or skip
              some of these.
            </Text>
            <Button mt='xl' size='md' variant='default'>
              Get started
            </Button>
          </Grid.Col>
          <Grid.Col md={7} span={12}>
            <SimpleGrid breakpoints={[{ maxWidth: 'xs', cols: 1 }]} cols={2} spacing={30}>
              {items}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </BackgroundImage>
  );
}

const useStyles = createStyles(theme => ({
  title: {
    color: theme.colors.gray[0],
    fontSize: 34,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    [theme.fn.smallerThan('md')]: {
      fontSize: 26,
    },
  },

  heading: {
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.lg,
    fontWeight: 600,
  },

  description: {
    color: theme.colors.gray[2],
  },
}));

const features = [
  {
    icon: IconPhoto,
    title: 'Store',
    description:
      'We offer storage to keep your photos and written text safe, so write and upload away!',
    color: 'red',
  },
  {
    icon: IconFolders,
    title: 'Organise everything',
    description: 'Organise and edit your descriptions, photos and memories with ease.',
    color: 'yellow',
  },
  {
    icon: IconSearch,
    title: 'Search',
    description:
      'Find your memories, written text, and photos using our user-friendly search functionality.',
    color: 'green',
  },
  {
    icon: IconTag,
    title: 'Collections',
    description: 'Group your memories into larger collections.',
    color: 'blue',
  },
];
