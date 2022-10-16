import { Box, Container, Group, Space, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAuthUser } from 'next-firebase-auth';

import { trpcClient } from '~clientUtils/trpcClient';
import { DeleteAccount } from '~components/profile/DeleteAccount';
import { EmailUpdateForm } from '~components/profile/EmailUpdateForm';
import { PasswordUpdateForm } from '~components/profile/PasswordUpdateForm';
import { StatsGroup } from '~components/profile/StatsGroup';

export function ProfileContainer() {
  const matches = useMediaQuery('(min-width: 900px)');
  const currentUser = useAuthUser();
  const { lastSignInTime, creationTime } = currentUser?.firebaseUser?.metadata || {};

  // grab date that user account was created and last accessed
  const loggedInDate = lastSignInTime ? new Date(lastSignInTime) : null;
  const createdDate = creationTime ? new Date(creationTime) : null;

  // calculate years since creation
  const date = new Date();
  const yearsSinceCreation: number = createdDate
    ? date.getFullYear() - createdDate.getFullYear()
    : 0;

  // user display name if they have it, else use email username, if they don't have that use error msg.
  const username =
    currentUser.displayName || currentUser?.email?.split('@')[0] || 'No name specified';

  // user profile stats - grab length of returned query
  const photo_count = trpcClient.useQuery(['photos.GetPhotos'])?.data?.photos?.length || 0;
  const collection_count =
    trpcClient.useQuery(['collection.GetCollections'])?.data?.collections?.length || 0;
  const memory_count = trpcClient.useQuery(['memory.GetMemories'])?.data?.memories?.length || 0;

  return (
    <Container size='xl'>
      <Space h='xl' />
      <Group align='start' position={matches ? 'apart' : 'center'}>
        <div>
          <Title order={1} size={65}>
            Hello, {username}
          </Title>
          <Space h='xl' />
          <Title order={2} weight={700}>
            Profile Statistics
          </Title>
          <Space h='md' />
          <StatsGroup
            data={[
              {
                title: (photo_count == 1 ? 'Photo' : 'Photos') + ' Uploaded',
                stats: photo_count,
                description: '',
              },
              {
                title: (memory_count == 1 ? 'Memory' : 'Memories') + ' Made',
                stats: memory_count,
                description: '',
              },
              {
                title: (collection_count == 1 ? 'Collection' : 'Collections') + ' Created',
                stats: collection_count,
                description: '',
              },
            ]}
          />
          <Space h='xl' />
          <Title order={2} weight={700}>
            Profile Overview
          </Title>
          <Space h='md' />
          <Text size='md' weight={600}>
            Email
          </Text>
          <Text size='md' span weight={400}>
            {currentUser.email || 'No email found'}
          </Text>
          <Space h='sm' />
          <Text size='md' weight={600}>
            Account Created
          </Text>
          <Text size='md' span weight={400}>
            {createdDate?.toDateString() || 'No creation date found'} -{' '}
            <Text italic size='md' span weight={400}>
              {yearsSinceCreation
                ? yearsSinceCreation + ' year' + (yearsSinceCreation != 1 ? 's' : '') + ' ago'
                : 'This Year'}
            </Text>
          </Text>
          <Space h='sm' />
          <Text size='md' weight={600}>
            Last Logged In
          </Text>
          <Text size='md' span weight={400}>
            {loggedInDate?.toDateString() || 'No login date found'}
          </Text>
          <Space h='xl' />
        </div>
        <div>
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

            <EmailUpdateForm />
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
            <PasswordUpdateForm />
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
              Delete Account
            </Text>
            <Text color='dimmed' size='xs'>
              Remove your profile and all associated data.
            </Text>
            <Space h='xs' />
            <DeleteAccount />
          </Box>
        </div>
      </Group>
      <Space h='xl' />
    </Container>
  );
}
