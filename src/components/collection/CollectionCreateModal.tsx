import { Modal, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { CollectionCreate } from './CollectionCreate';

export function CollectionCreateModal() {
  const router = useRouter();

  return (
    <>
      <NextSeo description='Creating a collection' title='Create collection' />
      <Modal
        lockScroll
        onClose={() => router.push('/collections', undefined, { shallow: true })}
        opened
        size='lg'
        title={<Title order={3}>Create collection</Title>}
      >
        <CollectionCreate />
      </Modal>
    </>
  );
}
