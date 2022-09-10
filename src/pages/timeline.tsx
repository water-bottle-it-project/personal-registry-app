import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { TimelineGrid } from '~components/timeline/TimelineGrid';

function Timeline() {
  return (
    <>
      <NextSeo description='My timeline of memories' title='Timeline' />
      <TimelineGrid />
    </>
  );
}

export default withAuthedPage(Timeline);
