import { Container, createStyles, Grid, Group, Space, Text, Title } from '@mantine/core';
import Lottie from 'lottie-react';

import heroLottie from '~components/homepage/hero-lottie.json';
import { LinkButton } from '~components/util/LinkButton';

/**
 * The Hero banner for the homepage
 * @constructor
 */
export function Hero() {
  const { classes } = useStyles();

  return (
    <Container size='xl'>
      <Space h='lg' />
      <Grid>
        <Grid.Col sm={6}>
          <Title className={classes.title}>
            The{' '}
            <Text color='indigo' inherit span>
              Definitive
            </Text>{' '}
            Personal Registry App
          </Title>
          <Text className={classes.heroGrid} mt='md'>
            Keep detailed records of personal artifacts, memories and events safely in this app,
            using your preferred combination of text and images.
          </Text>
          <Group align='center' className={classes.heroGrid} grow mt={20} spacing={30}>
            <LinkButton
              gradient={{ from: 'indigo', to: 'cyan' }}
              href='/signin'
              size='md'
              variant='gradient'
            >
              Sign in
            </LinkButton>
            <LinkButton href='/signin' size='md' variant='default'>
              Register
            </LinkButton>
          </Group>
        </Grid.Col>
        <Grid.Col sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
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
    marginTop: -60,
    maxWidth: 500,
    [theme.fn.smallerThan('md')]: {
      margin: 'auto',
    },
  },

  heroGrid: {
    maxWidth: '75%',
  },
}));
