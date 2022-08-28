import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { NotFound } from '~components/util/NotFound';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <NextSeo description='About This Website' title='About' />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
