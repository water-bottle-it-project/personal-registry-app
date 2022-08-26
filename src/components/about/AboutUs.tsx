import { Container, Grid, Space, Title } from '@mantine/core';

import { AboutUsCard } from './AboutUsCard';
import { Banner } from './Banner';
import { FAQ } from './FAQ';

const teamInfo = [
  {
    index: 0,
    name: 'Sean Tan',
    title: 'Front End Developer',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto fuga mollitia perspiciatis incidunt quisquam distinctio aut minima, veniam voluptates iure quo quis odio reprehenderit, sapiente, voluptatibus itaque praesentium similique fugiat?',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    index: 1,
    name: 'Kian Dsouza',
    title: 'Front End Developer',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto fuga mollitia perspiciatis incidunt quisquam distinctio aut minima, veniam voluptates iure quo quis odio reprehenderit, sapiente, voluptatibus itaque praesentium similique fugiat?',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    index: 2,
    name: 'Ian',
    title: 'Front End Developer',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto fuga mollitia perspiciatis incidunt quisquam distinctio aut minima, veniam voluptates iure quo quis odio reprehenderit, sapiente, voluptatibus itaque praesentium similique fugiat?',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    index: 3,
    name: 'Calvin',
    title: 'Front End Developer',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto fuga mollitia perspiciatis incidunt quisquam distinctio aut minima, veniam voluptates iure quo quis odio reprehenderit, sapiente, voluptatibus itaque praesentium similique fugiat?',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    index: 4,
    name: 'Jack',
    title: 'Front End Developer',
    desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto fuga mollitia perspiciatis incidunt quisquam distinctio aut minima, veniam voluptates iure quo quis odio reprehenderit, sapiente, voluptatibus itaque praesentium similique fugiat?',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
];

export function AboutUs() {
  const teamData = teamInfo.map(member => (
    <Grid.Col key={member.name} offset={member.index > 2 ? 1 : 0} span={4}>
      <AboutUsCard
        desc={member.desc}
        imgUrl={member.imgUrl}
        key={member.name}
        name={member.name}
        title={member.title}
      />
    </Grid.Col>
  ));

  return (
    <>
      <Banner />
      <Container size='xl'>
        <Space h='lg' />
        <Title align='center' order={1}>
          Meet the team
        </Title>
        <Space h='lg' />
        <Grid grow gutter='xs'>
          {teamData}
        </Grid>
      </Container>
      <Space h='xl' />
      <FAQ />
    </>
  );
}
