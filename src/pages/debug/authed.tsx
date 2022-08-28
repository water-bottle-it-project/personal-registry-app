import { Button, Code, Container, Text, Title } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthedPage } from '~clientUtils/authHooks';
import { trpcClient } from '~clientUtils/trpcClient';

function DebugAuth() {
  const user = useAuthUser();

  const { data, error } = trpcClient.useQuery(['debugAuthed.getAuthedDebug']);

  return (
    <Container size='xl'>
      <Title>Debug Page - auth required</Title>
      <Text>If you can see this, you are authed!</Text>
      <Button color='red' onClick={user.signOut} variant='light'>
        Sign out
      </Button>
      <Text>{user.id}</Text>
      <Text>{`should be a number: ${data ? data.result : error?.message}`}</Text>
      <Code block color='indigo'>
        {JSON.stringify(user, null, 2)}
      </Code>
    </Container>
  );
}

export default withAuthedPage(DebugAuth);