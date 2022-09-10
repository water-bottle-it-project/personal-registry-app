import { Container } from '@mantine/core';

import { MemoryHeader } from './MemoryHeader';

export function MemoryIndex() {
  return (
    <>
      <MemoryHeader />
      <Container size='xl'>{/* Insert images here */}</Container>
    </>
  );
}
