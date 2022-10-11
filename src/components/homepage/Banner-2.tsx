import { Carousel } from '@mantine/carousel';
import { Container, Image, SimpleGrid, Space, Title } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

import ipad from '~components/homepage/Mockup-iPad.png';
import iphone from '~components/homepage/Mockup-iPhone.png';
import macbook from '~components/homepage/Mockup-Macbook.png';

export function BannerWithMockup() {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <Container size='xl'>
      <Space h='xl' />
      <SimpleGrid breakpoints={[{ maxWidth: 900, cols: 1, spacing: 'sm' }]} cols={2}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title order={1}>Reactive.</Title>
          <Title order={1}>Responsive.</Title>
          <Title order={1}>Resilient.</Title>
        </div>
        <Carousel
          draggable={false}
          height='100%'
          loop
          mx='auto'
          plugins={[autoplay.current]}
          speed={3}
          withControls={false}
        >
          <Carousel.Slide>
            <Image alt='Macbook M1 Pro' src={macbook.src} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image alt='iPhone 12 Pro' src={iphone.src} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image alt='iPad Pro' src={ipad.src} />
          </Carousel.Slide>
        </Carousel>
      </SimpleGrid>
    </Container>
  );
}
