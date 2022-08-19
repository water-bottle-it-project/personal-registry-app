import type { ContainerProps } from '@mantine/core';
import { Container } from '@mantine/core';

/**
 * Container that removes horizontal padding when viewport width is smaller than md.
 * @param props
 * @constructor
 */
export function ContentContainer(props: ContainerProps) {
  return (
    <Container
      size='xl'
      {...props}
      sx={theme => ({
        [theme.fn.smallerThan('md')]: {
          padding: '0',
        },
      })}
    />
  );
}
