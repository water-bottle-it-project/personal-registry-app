import { Button, Code, Container, Text, Title } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthedPage } from '~clientUtils/authHooks';
import { trpcClient } from '~clientUtils/trpcClient';

function DebugAuth() {
  const user = useAuthUser();

  const { data: memoriesData, error: memoriesError } = trpcClient.useQuery(['memory.GetMemories']);
  const { data: memoryData, error: memoryError } = trpcClient.useQuery(
    ['memory.GetMemory', { _id: memoriesData?.memories?.[0]?._id || '' }],
    { enabled: !!memoriesData },
  );

  return (
    <Container size='xl'>
      <Title>Debug Page - auth required</Title>
      <Text>If you can see this, you are authed!</Text>
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
        {JSON.stringify(memoryData?.memory, null, 2)}
      </Code>
    </Container>
  );
}

export default withAuthedPage(DebugAuth);
