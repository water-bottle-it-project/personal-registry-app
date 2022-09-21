import { Button, Modal } from '@mantine/core';
import { useState } from 'react';
import { getAuth, deleteUser } from "firebase/auth";
import { trpcClient } from '~clientUtils/trpcClient';


export function DeleteAccount() {
  const [opened, setOpened] = useState(false);
  const collectionMutation = trpcClient.useMutation(['collection.DeleteAllCollection']);
  const memoryMutation = trpcClient.useMutation(['memory.DeleteAllMemories']);
  const photoMutation = trpcClient.useMutation(['images.DeleteAllImages']);
  const auth = getAuth();
  const user = auth.currentUser;
  async function handleDeleteAccount() {
    if (user) {
      await collectionMutation.mutate();
      await memoryMutation.mutate();
      await photoMutation.mutate();
      deleteUser(user).then(() => {
        console.log('account deleted');
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  return <>
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Are you sure you want to delete your account?'
    >
      <Button onClick={handleDeleteAccount}>Yes</Button>
      <Button onClick={() => setOpened(false)}>No</Button>
    </Modal>
    <Button onClick={()=>setOpened(true)}>Delete Account</Button>
  </>
}
