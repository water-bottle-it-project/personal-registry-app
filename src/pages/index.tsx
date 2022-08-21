import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { ColorSchemeToggle } from '~components/app/ColorSchemeToggle';
import { HeroBullets } from '~components/homepage/HeroOld';

const Home: NextPage = () => {
  return (
    <>
      <Container fluid>
        <HeroBullets />
      </Container>
    </>
  );
};

export default Home;
