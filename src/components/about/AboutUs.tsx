import { Container, createStyles, Grid, Space, Title } from '@mantine/core';

import { AboutUsCard } from '~components/about/AboutUsCard';
import { FAQ } from '~components/about/FAQ';
import { Banner } from '~components/util/Banner';

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

const useStyles = createStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export function AboutUs() {
  const { classes } = useStyles();

  const teamData = teamInfo.map(member => (
    <Grid.Col className={classes.wrapper} key={member.name} span={4}>
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
      <Banner
        description='We are a team of developers who develop developed applications that require development,
            while developing developer skills.'
        title='About Us'
      />
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
