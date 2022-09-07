import { Card, Container, createStyles, Image, Space, Text } from '@mantine/core';
import Link from 'next/link';

interface ImageCardProps {
  _id: string;
  caption: string;
  url: string;
  userId: string;
}

const useStyles = createStyles(theme => ({
  wrapper: {
    justifyContent: 'center',
  },
  card: {
    cursor: 'pointer',
  },
}));

export function ImageCard(props: ImageCardProps) {
  const { classes } = useStyles();
  return (
    <Container className={classes.wrapper} px={0}>
      <Link href={`/images?view=${props._id}`} passHref>
        <Card
          className={classes.card}
          p={0}
          sx={theme => ({
            backgroundColor: 'transparent',
            fontSize: theme.fontSizes.lg,
            width: 300,
          })}
          withBorder
        >
          <Card.Section>
            <Image alt='' height={200} src={props.url} />
          </Card.Section>

          <Text align='center' mt='sm' weight={600}>
            {props.caption}
          </Text>
          <Space h='xs' />
        </Card>
      </Link>
    </Container>
  );
}
