import { Container, createStyles, Grid, Group, Space, Text, Title } from '@mantine/core';
import { IconLogin, IconUserPlus } from '@tabler/icons';
import Lottie from 'lottie-react';

import heroLottie from '~components/homepage/hero-lottie.json';
import { LinkButton } from '~components/util/LinkButton';

export function Hero() {
  const { classes } = useStyles();

  return (
    <Container size='md'>
      <Grid>
        <Grid.Col sm={6}>
          <Space h={20} />
          <Title className={classes.title}>
            The{' '}
            <Text color='indigo' span>
              Definitive
            </Text>{' '}
            Personal Registry App
          </Title>
          <Text color='dimmed' mt='md'>
            Keep detailed records of personal artifacts, memories and events safely in this app,
            using your preferred combination of text and images.
          </Text>
          <Group align='center' mt={20} spacing={30}>
            <LinkButton
              gradient={{ from: 'indigo', to: 'blue' }}
              href='/signin'
              rightIcon={<IconLogin />}
              size='md'
              variant='gradient'
            >
              Sign in
            </LinkButton>
            <LinkButton href='/signin' rightIcon={<IconUserPlus />} size='md' variant='default'>
              Register
            </LinkButton>
          </Group>
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
    fontWeight: 900,
    [theme.fn.smallerThan('md')]: {
      fontSize: 32,
    },
  },

  lottie: {
    maxWidth: 400,
    [theme.fn.smallerThan('md')]: {
      margin: 'auto',
    },
  },
}));
