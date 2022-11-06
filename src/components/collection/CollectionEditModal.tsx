import { Modal, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { CollectionEdit } from '~components/collection/CollectionEdit';
import type { collectionIdOnlyT } from '~types/collectionT';

export function CollectionEditModal({ _id }: collectionIdOnlyT) {
  const router = useRouter();

  // Child <NextSeo/> tags override parent tags (e.g. on pages).
  // Useful for modal routing.
  return (
    <>
      <NextSeo description='Editing a collection' title='Edit collection' />
      <Modal
        lockScroll
        onClose={() => router.push('/collections', undefined, { shallow: true })}
        opened
        size='lg'
        title={<Title order={3}>Edit collection</Title>}
      >
        <CollectionEdit _id={_id} />
      </Modal>
    </>
  );
}
