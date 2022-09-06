import { Button, Code, Title } from '@mantine/core';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';

/**
 * Debug page for querying (aka GET) and mutating (aka POST) users using TRPC and Mongoose
 * @constructor
 */
export function DebugIndex() {
  const trpcUtils = trpcClient.useContext();

  const allUsers = trpcClient.useQuery(['debug.listUsers']);

  const createUser = trpcClient.useMutation(['debug.createUser'], {
    onSuccess: () => trpcUtils.invalidateQueries(['debug.listUsers']),
  });

  const deleteUser = trpcClient.useMutation(['debug.deleteUser'], {
    onSuccess: () => trpcUtils.invalidateQueries(['debug.listUsers']),
  });

  const image = trpcClient.useQuery(['images.getImage']);

  return (
    <>
      <Title>Debug index page</Title>
      <Button onClick={() => createUser.mutate()}>Create user debug1</Button>
      <Button color='red' onClick={() => deleteUser.mutate()} variant='light'>
        Delete user debug1
      </Button>
      <Title order={2}>All users</Title>
      <Code block color='indigo'>
        {image.data && JSON.stringify(image.data.image, null, 2)}
      </Code>
    </>
  );
}
