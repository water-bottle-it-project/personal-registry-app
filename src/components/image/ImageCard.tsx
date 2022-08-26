import { Card, Image, Text } from '@mantine/core';

interface ImageCardProps {
  caption: string;
  url: string;
  userId: string;
}

export function ImageCard(props: ImageCardProps) {
  return (
    <Card
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

      <Text align='left' mt='sm' weight={600}>
        {props.caption}
      </Text>
    </Card>
  );
}
