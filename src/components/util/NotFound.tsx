import { Container, createStyles, Space, Title } from '@mantine/core';
import Lottie from 'lottie-react';

import { LinkButton } from '~components/util/LinkButton';
import notFoundLottie from '~components/util/not-found-lottie.json';

export function NotFound() {
  const { classes } = useStyles();
  return (
    <>
      <Space h='xl' />
      <Container className={classes.wrapper}>
        <Lottie animationData={notFoundLottie} className={classes.lottie} loop />
        <Title order={1}>Are you lost?</Title>
        <Space h='xl' />
        <LinkButton gradient={{ from: 'indigo', to: 'cyan' }} href='/' size='md' variant='gradient'>
          BACK TO HOMEPAGE
        </LinkButton>
      </Container>
    </>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    maxWidth: 500,
    [theme.fn.smallerThan('md')]: {
      margin: 'auto',
    },
  },
}));
