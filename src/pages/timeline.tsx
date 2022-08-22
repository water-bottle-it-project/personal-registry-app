import type { NextPage } from 'next';

import { TimelineCard } from '~components/app/TimelineCard';

const Timeline: NextPage = () => {
  return (
    <>
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
