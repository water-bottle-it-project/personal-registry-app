import { Container, createStyles, Overlay, Text, Title } from '@mantine/core';

import banner from '~components/util/banner.jpg';

interface BannerProps {
  title: string;
  description: string;
}

export function Banner({ title, description }: BannerProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color='#000' opacity={0.65} zIndex={1} />
      <div className={classes.inner}>
        <Title className={classes.title}>{title}</Title>
        <Container size='xs'>
          <Text className={classes.description} size='lg'>
            {description}
          </Text>
        </Container>
      </div>
    </div>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: `url(${banner.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    [theme.fn.smallerThan('xs')]: {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },
}));
