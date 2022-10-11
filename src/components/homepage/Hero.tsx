import {
  Container,
  createStyles,
  Grid,
  Group,
  Space,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Lottie from 'lottie-react';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthComponent } from '~clientUtils/authHooks';
import heroLottie from '~components/homepage/hero-lottie.json';
import heroLottieDark from '~components/homepage/hero-lottie-dark.json';
import { LinkButton } from '~components/util/LinkButton';

/**
 * The Hero banner for the homepage
 * @constructor
 */
function HeroBase() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { id } = useAuthUser();

  return (
    <Container size='xl'>
      <Space h='xl' />
      <Space h='xl' />
      <Grid>
        <Grid.Col sm={6}>
          <Title className={classes.title}>
            The <Text color='indigo' inherit span /> Personal Registry App
          </Title>
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
              {id ? 'Your timeline' : 'Sign in'}
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
                gradient={{ from: 'indigo', to: 'cyan' }}
                href='/signin'
                size='md'
                variant='gradient'
              >
                {id ? 'Your timeline' : 'Sign in'}
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
          <Lottie
            animationData={theme.colorScheme === 'dark' ? heroLottieDark : heroLottie}
            className={classes.lottie}
            loop
          />
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
}));

const Hero = withAuthComponent(HeroBase);

export { Hero };
