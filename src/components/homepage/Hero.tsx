import { Container, createStyles, Grid, Space, Text, Title } from '@mantine/core';
import Lottie from 'lottie-react';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthComponent } from '~clientUtils/authHooks';
import heroLottie from '~components/homepage/hero-lottie-optimized.json';
import { LinkButton } from '~components/util/LinkButton';

/**
 * The Hero banner for the homepage
 * @constructor
 */
function HeroBase() {
  const { classes } = useStyles();
  const { id } = useAuthUser();

  return (
    <Container size='xl'>
      <Space h='xl' />
      <Space h='xl' />
      <Grid>
        <Grid.Col sm={6}>
          <Title className={classes.title} color='indigo'>
            SnapSave
          </Title>
          <Title className={classes.title}>The Personal Registry App</Title>
          <Text className={classes.heroGrid} mt='md'>
            Keep detailed records of personal artifacts, memories and events safely in this app,
            using your preferred combination of text and images.
          </Text>
          {/* Timeline button text cuts off at mobile sizes when using Group */}
          {/* <Group align='center' className={classes.heroGrid} grow mt={20} spacing={30}>
            <LinkButton
              gradient={{ from: 'indigo', to: 'cyan' }}
              href='/signin'
              size='md'
              variant='gradient'
            >
              {id ? 'Your memories' : 'Sign in'}
            </LinkButton>
            <LinkButton
              href='/signup'
              size='md'
              style={{ visibility: id ? 'hidden' : 'visible' }}
              variant='default'
            >
              Register
            </LinkButton>
          </Group> */}
          <Grid mt={20}>
            <Grid.Col lg={2} md={3} sm={4}>
              <LinkButton
                className={classes.gradientBg}
                gradient={{ from: 'indigo', to: 'cyan' }}
                href={id ? '/timeline' : '/signin'}
                size='md'
                variant='gradient'
              >
                {id ? 'Your memories' : 'Sign in'}
              </LinkButton>
            </Grid.Col>
            <Grid.Col lg={2} md={3} sm={4}>
              <LinkButton
                href='/signup'
                size='md'
                style={{ visibility: id ? 'hidden' : 'visible' }}
                variant='default'
              >
                Register
              </LinkButton>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={6}>
          <Lottie animationData={heroLottie} className={classes.lottie} loop />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 44,
    lineHeight: 1.1,
    fontWeight: 900,
    [theme.fn.smallerThan('md')]: {
      fontSize: 36,
    },
  },

  lottie: {
    marginTop: -90,
    maxWidth: 500,
    [theme.fn.smallerThan('md')]: {
      margin: 'auto',
    },
  },

  heroGrid: {
    maxWidth: '75%',
  },

  gradientBg: {
    '@keyframes background-pan': {
      from: {
        backgroundPosition: '0% center',
      },
      to: {
        backgroundPosition: '-200% center',
      },
    },
    animation: 'background-pan 12s linear infinite',
    background:
      theme.colorScheme === 'dark'
        ? 'linear-gradient(to right, rgb(33, 19, 114), rgb(4, 109, 109), rgb(33, 19, 114)) 100%'
        : 'linear-gradient(to right,rgb(76, 110, 245), rgb(0, 204, 153), rgb(76, 110, 245)) 100%',
    backgroundSize: '200%',
  },
}));

const Hero = withAuthComponent(HeroBase);

export { Hero };
