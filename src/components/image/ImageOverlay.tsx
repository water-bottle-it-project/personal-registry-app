import { Container, createStyles, Image, SimpleGrid, Space, Text, Title } from '@mantine/core';

import { ImageOverlayInfo } from './ImageOverlayInfo';
import { ImageOverlayMetadata } from './ImageOverlayMetadata';

export interface ImageCardProps {
  caption: string;
  url: string;
  userId: string;
}

export function ImageOverlay(props: ImageCardProps) {
  const { classes } = useStyles();
  return (
    <Container
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        fontSize: theme.fontSizes.sm,
        padding: '0',
      })}
    >
      <Image alt='' height='50%' src={props.url} />
      <Space h='md' />
      <Title order={1}>{props.caption}</Title>
      <Text>Posted on August 12 2022</Text>

      <Space h='md' />
      <Container className={classes.wrapper}>
        <SimpleGrid
          breakpoints={[{ maxWidth: 'md', cols: 1, spacing: 'sm' }]}
          cols={2}
          spacing='lg'
        >
          <ImageOverlayInfo caption={props.caption} url={props.url} userId={props.userId} />
          <ImageOverlayMetadata caption={props.caption} url={props.url} userId={props.userId} />
        </SimpleGrid>
      </Container>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    padding: '0',
  },
}));
