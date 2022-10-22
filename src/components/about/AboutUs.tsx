import { Container, createStyles, Grid, Space, Title } from '@mantine/core';

import { AboutUsCard } from '~components/about/AboutUsCard';
import { FAQ } from '~components/about/FAQ';
import { Banner } from '~components/util/Banner';

const teamInfo = [
  {
    name: 'Sean Tan',
    title: 'Human and Frontend lead',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    name: 'Kian Dsouza',
    title: 'Awesome human and Backend lead',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    name: 'Ian Chen',
    title: 'Overwatch noob and Framework finder',
    imgUrl: '/team/ian.jpg',
  },
  {
    name: 'Jack Woodman',
    title: '8 Fingers, 2 Thumbs, Communications & Scrum Lead',
    imgUrl: 'https://i.kym-cdn.com/entries/icons/facebook/000/026/152/gigachad.jpg',
  },
  {
    name: 'Calvin Yu',
    title: 'Project Manager',
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
        description='We are a team of developers who develop developed applications that require
          development, while developing developer skills.'
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
