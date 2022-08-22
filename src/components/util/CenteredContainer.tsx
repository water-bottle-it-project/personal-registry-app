import type { ContainerProps } from '@mantine/core';
import { Center, Container } from '@mantine/core';

/**
 * Container that vertically centers child elements
 * @param props
 * @constructor
 */
export function CenteredContainer(props: ContainerProps) {
  return (
    <Container {...props} style={{ height: '100%' }}>
      <Center style={{ height: '100%' }}>{props.children}</Center>
    </Container>
  );
}
