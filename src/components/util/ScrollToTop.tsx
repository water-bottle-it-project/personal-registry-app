import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';

export interface ScrollToTopProps {
  bottom?: number;
}

export function ScrollToTop({ bottom = 20 }: ScrollToTopProps) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom, right: 20 }}>
      <Transition mounted={scroll.y > 480} transition='slide-up'>
        {transitionStyles => (
          <Button
            leftIcon={<IconArrowUp size={16} />}
            onClick={() => scrollTo({ y: 0 })}
            style={transitionStyles}
            sx={{ width: 140 }}
            variant='light'
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
