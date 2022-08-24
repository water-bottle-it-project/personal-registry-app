import { Container, Space, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';

import { StatsGroup } from '~components/profile/profileStats';

const Profile: NextPage = () => {
  return (
    <>
      <Container px='md'>
      <Space h='xl' />
        <Title order={1} size={65}>
          John Doe
        </Title>

        <Space h='md' />


        <Text size='xl' weight={700}>
          Profile Overview
        </Text>

        <Text size='md' weight={600}>
          Email:{' '}
          <Text size='md' span weight={400}>
            jdoe@student.unimelb.edu.au
          </Text>
        </Text>


        <Text size='md' weight={600}>
          Account Created:{' '}
          <Text size='md' span weight={400}>
            02/02/2014 -{' '}
            <Text italic size='md' span weight={400}>
              4 years ago
            </Text>
          </Text>
        </Text>

        <Space h='lg' />

        <StatsGroup
          data={[
            {
              title: 'Photos Uploaded',
              stats: '456,133',
              description: '24% more than in the same month last year, 33% more that two years ago',
            },
            {
              title: 'Memories Made',
              stats: '2,175',
              description: '13% less compared to last month, new user engagement up by 6%',
            },
            {
              title: 'Collections Created',
              stats: '1,994',
              description: '1994 orders were completed this month, 97% satisfaction rate',
            },
          ]}
        />
      </Container>
    </>
  );
};

export default Profile;
