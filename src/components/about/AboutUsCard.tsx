import { Card, Image, Space, Text, Title } from '@mantine/core';

export interface AboutUsProps {
  name: string;
  title: string;
  desc?: string;
  imgUrl: string;
}

export function AboutUsCard({ imgUrl, name, title }: AboutUsProps) {
  return (
    <Card
      m='xs'
      p='md'
      pb='xs'
      sx={theme => ({
        fontSize: theme.fontSizes.lg,
        width: 300,
      })}
      withBorder
    >
      <Card.Section>
        <Image alt={name} height={300} src={imgUrl} />
      </Card.Section>
      <Space h='xs' />
      <Title align='center' color='indigo' order={3}>
        {name}
      </Title>
      <Text align='center' size='sm'>
        {title}
      </Text>
      {/*<Text align='center' mt='sm' weight={400}>*/}
      {/*  {desc}*/}
      {/*</Text>*/}
      <Space h='xs' />
    </Card>
  );
}
