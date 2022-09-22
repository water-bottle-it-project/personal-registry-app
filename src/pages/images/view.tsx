import { Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { ImageOverlay } from '~components/image/ImageOverlay';

function CollectionEditPage() {
  const router = useRouter();
  const viewId = router.query.id;
  if (!viewId || Array.isArray(viewId)) {
    void router.replace('/images');
    return (
      <Container size='xl'>
        <Text>No Image id provided; redirecting...</Text>;
      </Container>
    );
  }

  return (
    <>
      <ImageOverlay _id={viewId} />
    </>
  );
}

export default withAuthedPage(CollectionEditPage);
