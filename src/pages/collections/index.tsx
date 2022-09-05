import { Container, Modal, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionEdit } from '~components/collection/CollectionEdit';
import { CollectionsGrid } from '~components/collection/CollectionsGrid';

const Collections = () => {
  const router = useRouter();
  let modal: React.ReactNode = null;
  const editId = router.query.edit;
  if (editId && !Array.isArray(editId)) {
    modal = (
      <Modal
        lockScroll
        onClose={() => router.push('/collections', undefined, { shallow: true })}
        opened
        size='lg'
        title={<Title order={3}>Edit collection</Title>}
      >
        <CollectionEdit _id={editId} />
      </Modal>
    );
  }

  return (
    <>
      <NextSeo description='Create a collection in my personal registry' title='Collections' />
      <Container size='xl'>
        {modal}
        <CollectionsGrid />
      </Container>
    </>
  );
};

export default withAuthedPage(Collections);
