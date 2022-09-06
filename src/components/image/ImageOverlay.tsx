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
import { useRouter } from 'next/router';

import { trpcClient } from '~clientUtils/trpcClient';

import { ImageOverlayInfo } from './ImageOverlayInfo';
import { ImageOverlayInfoEdit } from './ImageOverlayInfoEdit';
import { ImageOverlayMetadata } from './ImageOverlayMetadata';

export interface ImageCardProps {
  _id: string;
  caption: string;
  url: string;
  userId: string;
  handleNext: (event: React.MouseEvent<HTMLElement>) => void;
  handlePrev: (event: React.MouseEvent<HTMLElement>) => void;
}

export function ImageOverlay(props: ImageCardProps) {
  const router = useRouter();
  const editId = router.query.edit;
  let info: React.ReactNode = null;

  const { classes } = useStyles();

  const { data, isLoading, isError, error, isSuccess } = trpcClient.useQuery([
    'images.getImage',
    { _id: props._id },
  ]);

  data && console.log(data.image);

  if (editId && !Array.isArray(editId)) {
    info = (
      <ImageOverlayInfoEdit
        _id={props._id}
        caption={data?.image.caption}
        url={data?.image.url}
        userId={data?.image.userId}
      />
    );
  } else {
    info = (
      <ImageOverlayInfo
        _id={props._id}
        caption={data?.image.caption}
        url={data?.image.url}
        userId={data?.image.userId}
      />
    );
  }

  return (
    <Container
      sx={theme => ({
        fontSize: theme.fontSizes.sm,
        padding: '0',
      })}
    >
      <Image alt='' height='50%' src={data?.image.url} />
      <Space h='md' />
      <Title order={1}>{data?.image.caption}</Title>
      <Text>Posted on August 12 2022</Text>

      <Space h='md' />
      <Container className={classes.wrapper}>
        <SimpleGrid
          breakpoints={[{ maxWidth: 'md', cols: 1, spacing: 'sm' }]}
          cols={2}
          spacing='lg'
        >
          {info}
          <ImageOverlayMetadata
            caption={data?.image.caption}
            url={data?.image.url}
            userId={data?.image.userId}
          />
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
