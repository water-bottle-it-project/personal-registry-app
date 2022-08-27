import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import type { NextPage } from 'next';

import { StatsGroup } from '~components/profile/profileStats';
import {
  ConfirmPassword,
  InputValidation,
  UpdatePassword,
} from '~components/profile/updateDetails';

const Profile: NextPage = () => {
  return (
    <>
      <Container px='xs'>
        <Space h='xl' />

        <Grid>
          <Grid.Col span={7}>
            <Container>
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
                    description: '',
                  },
                  {
                    title: 'Memories Made',
                    stats: '2,175',
                    description: '',
                  },
                  {
                    title: 'Collections Created',
                    stats: '1,994',
                    description: '',
                  },
                ]}
              />
            </Container>
          </Grid.Col>

          <Grid.Col span={5}>
            <Container>
              <Box
                sx={theme => ({
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.gray : theme.colors.gray[2],
                  textAlign: 'left',
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.lg,
                })}
              >
                <Text size='xl' weight={800}>
                  Update Email
                </Text>

                <Space h='xs' />

                <InputValidation />
                <Space h='xs' />
                <Button ml={10}>Submit</Button>
              </Box>

              <Space h='xl' />
              <Box
                sx={theme => ({
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.gray : theme.colors.gray[2],
                  textAlign: 'left',
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.lg,
                })}
              >
                <Text size='xl' weight={800}>
                  Update Password
                </Text>
                <Space h='xs' />
                <UpdatePassword />

                <Space h='md' />
                <ConfirmPassword />
                <Space h='xs' />
                <Button ml={10}>Submit</Button>
              </Box>
            </Container>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
