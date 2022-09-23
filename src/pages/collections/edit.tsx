import { Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionEditModal } from '~components/collection/CollectionEditModal';

function CollectionEditPage() {
  const router = useRouter();
  const editId = router.query.id;
  if (!editId || Array.isArray(editId)) {
    void router.replace('/collections');
    console.log('hi');
    return (
      <Container size='xl'>
        <Text>No collection id provided; redirecting...</Text>;
      </Container>
    );
  }

  return (
    <>
      <CollectionEditModal _id={editId} />
    </>
  );
}

export default withAuthedPage(CollectionEditPage);
