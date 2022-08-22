import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { Hero } from '~components/homepage/Hero';

const Home: NextPage = () => {
  return (
    <>
      <Container fluid>
        <Hero />
      </Container>
    </>
  );
};

export default Home;
