import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionEditModal } from '~components/collection/CollectionEditModal';
import { CollectionsGrid } from '~components/collection/CollectionsGrid';

const Collections = () => {
  const router = useRouter();
  const editId = router.query.edit;

  return (
    <>
      <NextSeo description='Create a collection in my personal registry' title='Collections' />
      <Container size='xl'>
        {editId && !Array.isArray(editId) && <CollectionEditModal _id={editId} />}
        <CollectionsGrid />
      </Container>
    </>
  );
};

export default withAuthedPage(Collections);
