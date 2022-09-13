import { Container, Space } from '@mantine/core';

import { TimelineGrid } from './TimelineGrid';
import { TimelineHeader } from './TimelineHeader';

export function TimelineIndex() {
  return (
    <>
      <Container size='xl'>
        <Space h='xl' />
        <TimelineHeader />
        <Space h='xl' />
      </Container>
      <Container size='xl'>
        <TimelineGrid />
      </Container>
    </>
  );
}
