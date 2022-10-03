import { Box, Container, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { trpcClient } from '~clientUtils/trpcClient';
import { EmailUpdateForm } from '~components/profile/EmailUpdateForm';
import { PasswordUpdateForm } from '~components/profile/PasswordUpdateForm';
import { stringToDate, tupleToString } from '~components/profile/profileUtils';
import { StatsGroup } from '~components/profile/StatsGroup';

export function ProfileContainer() {
  const currentUser = useAuthUser();

  // grab date that user account was created and last accessed
  const loggedInDate = stringToDate(
    currentUser?.firebaseUser?.metadata?.lastSignInTime || '1/1/2001',
  );
  const createdDate = stringToDate(currentUser?.firebaseUser?.metadata?.creationTime || '1/1/2001');

  // calculate years since creation
  const date = new Date();
  const yearSinceCreation = date.getFullYear() - createdDate[2];

  // user display name if they have it, else use email username, if they don't have that use error msg.
  const username = currentUser.displayName || currentUser?.email?.split('@')[0] || 'No Name Found';

  // user profile stats - grab length of returned query
  const photo_count = trpcClient.useQuery(['photos.GetPhotos'])?.data?.photos?.length || 0;
  const collection_count =
    trpcClient.useQuery(['collection.GetCollections'])?.data?.collections?.length || 0;
  const memory_count = trpcClient.useQuery(['memory.GetMemories'])?.data?.memories?.length || 0;

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
                title: (photo_count == 1 ? 'Photo' : 'Photos') + ' Uploaded',
                stats: photo_count.toString(),
                description: '',
              },
              {
                title: (memory_count == 1 ? 'Memory' : 'Memories') + ' Made',
                stats: memory_count.toString(),
                description: '',
              },
              {
                title: (collection_count == 1 ? 'Collection' : 'Collections') + ' Created',
                stats: collection_count.toString(),
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
        </Container>
      </SimpleGrid>
    </Container>
  );
}
