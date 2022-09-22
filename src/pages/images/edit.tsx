import { Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { ImageOverlay } from '~components/image/ImageOverlay';

function CollectionEditPage() {
  const router = useRouter();
  const editId = router.query.id;
  if (!editId || Array.isArray(editId)) {
    void router.replace('/images');
    return (
      <Container size='xl'>
        <Text>No Image id provided; redirecting...</Text>;
      </Container>
    );
  }

  return (
    <>
      <ImageOverlay _id={editId} />
    </>
  );
}

export default withAuthedPage(CollectionEditPage);
