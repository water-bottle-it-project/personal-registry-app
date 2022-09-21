import { createStyles, Text } from '@mantine/core';
import { useState } from 'react';

interface ShowMoreProps {
  text: string;
}

export function ShowMore({ text }: ShowMoreProps) {
  const { classes } = useStyles();
  const [isShowMore, setIsShowMore] = useState(true);
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <Text className={classes.preWrap} inline>
      {isShowMore ? text.slice(0, 200) : text}
      <Text className={classes.showOrHide} onClick={toggleShowMore} span>
        {isShowMore ? '...read more' : ' show less'}
      </Text>
    </Text>
  );
}

const useStyles = createStyles(theme => ({
  showOrHide: {
    color: theme.colors.blue,
    cursor: 'pointer',
  },
  preWrap: {
    whiteSpace: 'pre-wrap',
  },
}));
