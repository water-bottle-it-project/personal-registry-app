import { Container } from '@mantine/core';

import type { memoryT } from '~types/memory/memory';

import { MemoryHeader } from './MemoryHeader';

interface MemoryIndexProps extends memoryT {
  imageCount?: number;
}

export function MemoryIndex(props: MemoryIndexProps) {
  return (
    <>
      <MemoryHeader />
      <Container size='xl'>{/* Insert images here */}</Container>
    </>
  );
}
