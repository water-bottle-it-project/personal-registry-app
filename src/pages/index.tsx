import { Container, Space } from '@mantine/core';
import type { NextPage } from 'next';

import { FeaturesTitle } from '~components/homepage/Features';
import { Hero } from '~components/homepage/Hero';

const Home: NextPage = () => {
  return (
    <>
      <Container fluid p={0}>
        <Hero />
        <Space h={20} />
        <FeaturesTitle />
      </Container>
    </>
  );
};

export default Home;
