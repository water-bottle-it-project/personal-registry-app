import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { NotFound } from '~components/util/NotFound';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <NextSeo description='404 Page' title='Not Found' />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
