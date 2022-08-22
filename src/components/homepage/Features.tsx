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

const useStyles = createStyles(theme => ({
  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    [theme.fn.smallerThan('md')]: {
      fontSize: 26,
    },
  },

  whiteText: {
    color: 'white',
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

export function FeaturesTitle() {
  const { classes } = useStyles();

  const items = features.map(feature => (
    <div key={feature.title}>
      <ThemeIcon color={feature.color} radius='md' size={44}>
        <feature.icon size={26} stroke={1.8} />
      </ThemeIcon>
      <Text className={classes.whiteText} mt='sm' size='lg' weight={500}>
        {feature.title}
      </Text>
      <Text className={classes.whiteText} color='dimmed' size='sm'>
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <BackgroundImage src='/gradient.svg'>
      <Container size='md'>
        <Grid m={0} py={30}>
          <Grid.Col md={5} span={12}>
            <Title className={classes.title} order={2}>
              Manage your memories like no other way
            </Title>
            <Text className={classes.whiteText}>
              We offer rich features to properly store and manage your precious photos and memories.
            </Text>
            <Space h='md' />
            <Text className={classes.whiteText}>
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
