import { Button, Container, Text, Title } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthedPage } from '~clientUtils/authHooks';

function DebugAuth() {
  const user = useAuthUser();

  return (
    <Container size='xl'>
      <Title>Debug Auth Page</Title>
      <Text>If you can see this, you are authed!</Text>
      <Button color='red' onClick={user.signOut} variant='light'>
        Sign out
      </Button>
    </Container>
  );
}

export default withAuthedPage(DebugAuth);
