import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { PhotosIndex } from '~components/photo/PhotosIndex';

function Images() {
  return (
    <>
      <NextSeo description='My photos' title='Photos' />
      <PhotosIndex />
    </>
  );
}

export default withAuthedPage(Images);
