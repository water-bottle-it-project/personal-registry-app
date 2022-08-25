import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { TimelineCard } from '~components/timeline/TimelineCard';

const Timeline: NextPage = () => {
  return (
    <>
      <NextSeo description='My timeline of memories' title='Timeline' />
      <div>Hello timeline</div>
      <TimelineCard
        collections='friends'
        date='2021-07-02'
        description='A calm picturesque holiday with friends in Switzerland'
        photos='3'
        title='Swiss Alps'
      />
    </>
  );
};

export default Timeline;
