import { Button, Code, Container, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { useAuthUser } from 'next-firebase-auth';
import router from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { trpcClient } from '~clientUtils/trpcClient';

function DebugAuth() {
  const user = useAuthUser();

  const { data: memoriesData, error: memoriesError } = trpcClient.useQuery(['memory.GetMemories']);
  const { data: memoryData, error: memoryError } = trpcClient.useQuery(
    ['memory.GetMemory', { _id: memoriesData?.memories?.[0]?._id || '' }],
    { enabled: !!memoriesData },
  );

  const trpcUtils = trpcClient.useContext();
  const mutation = trpcClient.useMutation(['images.UpdateImage']);
  const handleLogin = async () => {
    mutation.mutate(
      {
        _id: '63074225bda448b6219cd922',
        caption: 'hey its me',
        // location: 'tina',
        // photoDate: null,
      },
      {
        onSuccess: async () => {
          // Auto-refresh without reload
          await trpcUtils.invalidateQueries([
            'images.getImage',
            { _id: '63074225bda448b6219cd922' },
          ]);
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Collection successfully saved.',
          });
        },
      },
    );
  };

  const { data, isLoadingError, isLoading } = trpcClient.useQuery([
    'images.getImage',
    { _id: '63074225bda448b6219cd922' },
  ]);

  return (
    <Container size='xl'>
      <Title>Debug Page - auth required</Title>
      <Text>If you can see this, you are authed!</Text>
      <Text>Login Form</Text>
      <Button disabled={mutation.isLoading} onClick={handleLogin}>
        Login
      </Button>
      <Text>Image</Text>
      <Code block color='green'>
        {JSON.stringify(data?.image, null, 2)}
      </Code>
      {/* {mutation.error && <p>Something went wrong! {mutation.error.message}</p>} */}
      <Button color='red' onClick={user.signOut} variant='light'>
        Sign out
      </Button>
      <Text>{user.id}</Text>
      <Code block color='indigo'>
        {JSON.stringify(user, null, 2)}
      </Code>
      <Text>All memories for this user</Text>
      <Code block color='green'>
        {JSON.stringify(memoriesData?.memories, null, 2)}
      </Code>
      <Text>Most recent memory for this user</Text>
      <Code block color='yellow'>
        {JSON.stringify(memoryData, null, 2)}
      </Code>
      <Text>your search query for collections</Text>
    </Container>
  );
}

export default withAuthedPage(DebugAuth);
