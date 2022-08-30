import { Box, Button, Container, SimpleGrid, Space, Text, Title } from '@mantine/core';
import type { AuthUserContext } from 'next-firebase-auth';
import { useAuthUser } from 'next-firebase-auth';

import { trpcClient } from '~clientUtils/trpcClient';

import { ConfirmPassword, InputValidation, UpdatePassword } from './ConfirmPassword';
import { StatsGroup } from './StatsGroup';

export function ProfileContainer(userID: any) {
  const allUsers = trpcClient.useQuery(['profile.listUsers']);

  console.log('grabbing user');
  console.log(' ++ ');
  if (allUsers.data.user) {
    console.log(JSON.stringify(allUsers.data.user, null, 2));
  }

  console.log('found user');
  return (
    <Container px='xs'>
      <Space h='xl' />

      <SimpleGrid
        breakpoints={[
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
        cols={2}
        spacing='xl'
      >
        <Container>
          <Title order={1} size={65}>
            dd
          </Title>
          <Space h='md' />

          <Text size='xl' weight={700}>
            Profile Overview
          </Text>

          <Text size='md' weight={600}>
            Email:{' '}
            <Text size='md' span weight={400}>
              {allUsers.email || 'No email'}
            </Text>
          </Text>

          <Text size='md' weight={600}>
            Account Created:{' '}
            <Text size='md' span weight={400}>
              need to -{' '}
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

        <Container>
          <Box
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.gray : theme.colors.gray[2],
              textAlign: 'left',
              padding: theme.spacing.md,
              borderRadius: theme.radius.lg,
              minWidth: '300px',
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
      </SimpleGrid>
    </Container>
  );
}
