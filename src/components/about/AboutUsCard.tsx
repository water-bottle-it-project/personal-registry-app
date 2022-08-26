import { Card, Image, Space, Text, Title } from '@mantine/core';

export interface AboutUsProps {
  name: string;
  title: string;
  desc: string;
  imgUrl: string;
}

export function AboutUsCard(props: AboutUsProps) {
  return (
    <Card
      m='xs'
      p='md'
      sx={theme => ({
        fontSize: theme.fontSizes.lg,
        width: 300,
      })}
      withBorder
    >
      <Card.Section>
        <Image alt={props.name} height={300} src={props.imgUrl} />
      </Card.Section>
      <Space h='xs' />
      <Title align='center' order={3}>
        {props.name}
      </Title>
      <Text align='center' color='dimmed' size='xs'>
        {props.title}
      </Text>
      <Text align='center' mt='sm' weight={400}>
        {props.desc}
      </Text>
      <Space h='xs' />
    </Card>
  );
}
