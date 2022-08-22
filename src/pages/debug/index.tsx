import { Container } from '@mantine/core';

import { DebugIndex } from '~components/debug/DebugIndex';

/**
 * Debug page
 * @constructor
 */
export default function Debug() {
  return (
    <Container>
      <DebugIndex />
    </Container>
  );
}
