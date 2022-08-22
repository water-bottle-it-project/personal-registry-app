import { Container, Space } from '@mantine/core';
import type { NextPage } from 'next';

import { FeaturesTitle } from '~components/homepage/Features';
import { Hero } from '~components/homepage/Hero';

const Home: NextPage = () => {
  return (
    <>
      <Container fluid>
        <Hero />
        <Space h={60} />
        <FeaturesTitle />
      </Container>
    </>
  );
};

export default Home;
