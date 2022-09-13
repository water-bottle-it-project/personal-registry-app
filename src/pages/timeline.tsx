import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { TimelineIndex } from '~components/timeline/TimelineIndex';

function Timeline() {
  return (
    <>
      <NextSeo description='My timeline of memories' title='Timeline' />
      <TimelineIndex />
    </>
  );
}

export default withAuthedPage(Timeline);
