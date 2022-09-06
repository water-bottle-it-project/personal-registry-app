import {
  Button,
  Container,
  createStyles,
  Image,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageOverlayInfo } from './ImageOverlayInfo';
import { ImageOverlayMetadata } from './ImageOverlayMetadata';

export interface ImageCardProps {
  _id: string;
  caption: string;
  url: string;
  userId: string;
  handleNext?: (event: React.MouseEvent<HTMLElement>) => void;
  handlePrev?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function ImageOverlay(props: ImageCardProps) {
  const { classes } = useStyles();

  const { data, isLoading, isError, error, isSuccess } = trpcClient.useQuery([
    'images.getImage',
    { _id: props._id },
  ]);

  // if (isError) {
  //   showNotification({
  //     color: 'red',
  //     title: 'Error!',
  //     message: 'Error loading collection details.',
  //   });
  //   return <Text>Error loading collection details: {error?.message}</Text>;
  // }

  // if (isLoading || !data?.image) {
  //   console.log("data bitches", data);
  //   return <Text>Loading image details...</Text>;
  // }

  // if (isSuccess) {
  //   data && console.log("data bitches", data.image);
  // }
  console.log(props._id);

  return (
    <Container
      sx={theme => ({
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
      <Button onClick={props.handlePrev}>prev</Button>
      <Button onClick={props.handleNext}>next</Button>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    padding: '0',
  },
}));
