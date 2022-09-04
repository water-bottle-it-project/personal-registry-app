import { Card, Container, Modal, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionEdit } from '~components/collection/CollectionEdit';

function CollectionEditPage() {
  const router = useRouter();
  const id = router.query.id;
  if (!id || Array.isArray(id)) {
    void router.replace('/collections2');
    return (
      <Container size='xl'>
        <Text>No collection id provided; redirecting...</Text>;
      </Container>
    );
  }

  return (
    <Modal
      centered
      onClose={() => router.push('/collections2')}
      opened
      size='lg'
      title={<Title order={3}>Edit collection</Title>}
    >
      <CollectionEdit _id={id} />
    </Modal>
  );
}

export default withAuthedPage(CollectionEditPage);
