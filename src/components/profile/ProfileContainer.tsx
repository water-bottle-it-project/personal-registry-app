import { Box, Button, Container, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { stringToDate, tupleToString } from '~components/profile/profileUtils';

import { ConfirmPassword, InputValidation, UpdatePassword } from './ConfirmPassword';
import { StatsGroup } from './StatsGroup';

export function ProfileContainer() {
  const currentUser = useAuthUser();

  // grab date that user account was created
  const loggedInDate = stringToDate(
    currentUser?.firebaseUser?.metadata?.lastSignInTime || '1/1/2001',
  );
  const createdDate = stringToDate(currentUser?.firebaseUser?.metadata?.creationTime || '1/1/2001');

  const date = new Date();
  const yearSinceCreation = date.getFullYear() - createdDate[2];

  // user display name if they have it, else use email username, if they don't have that use error msg.
  const username = currentUser.displayName || currentUser?.email?.split('@')[0] || 'No Name Found';

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
            {username}
          </Title>
          <Space h='md' />

          <Text size='xl' weight={700}>
            Profile Overview
          </Text>

          <Text size='md' weight={600}>
            Email:{' '}
            <Text size='md' span weight={400}>
              {currentUser.email || 'No email found'}
            </Text>
          </Text>

          <Text size='md' weight={600}>
            Account Created:{' '}
            <Text size='md' span weight={400}>
              {tupleToString(createdDate) || 'No creation date found'} -{' '}
              <Text italic size='md' span weight={400}>
                {yearSinceCreation == 0
                  ? 'This Year'
                  : yearSinceCreation + ' year' + (yearSinceCreation > 1 ? 's' : '') + ' ago'}
              </Text>
            </Text>
          </Text>

          <Text size='md' weight={600}>
            Last Logged In:{' '}
            <Text size='md' span weight={400}>
              {tupleToString(loggedInDate) || 'No login date found'}
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
