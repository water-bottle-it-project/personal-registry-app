import { Container, Space } from '@mantine/core';
import type { NextPage } from 'next';

import { BannerWithMockup } from '~components/homepage/Banner-2';
import { FeaturesTitle } from '~components/homepage/Features';
import { Hero } from '~components/homepage/Hero';
import { Banner } from '~components/util/Banner';

const Home: NextPage = () => {
  return (
    <>
      <Container fluid p={0}>
        <Hero />
        <Space h={20} />
        <FeaturesTitle />
        <BannerWithMockup />
        <Banner description='Feel free to contact us on 012 3456 789' title='Need help?' />
      </Container>
    </>
  );
};

export default Home;
