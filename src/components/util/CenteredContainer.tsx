import type { ContainerProps } from '@mantine/core';
import { Center } from '@mantine/core';

import { ContentContainer } from '~components/util/ContentContainer';

/**
 * Container that vertically centers child elements
 * @param props
 * @constructor
 */
export function CenteredContainer(props: ContainerProps) {
  return (
    <ContentContainer {...props} style={{ height: '100%' }}>
      <Center style={{ height: '100%' }}>{props.children}</Center>
    </ContentContainer>
  );
}
