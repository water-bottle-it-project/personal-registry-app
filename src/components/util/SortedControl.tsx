import { Box, Center, SegmentedControl } from '@mantine/core';
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons';

import type { sortOrderT } from '~types/util/sortOrderT';

interface SortedControlProps {
  defaultValue: sortOrderT;
  sortOrder: (value: ((prevState: sortOrderT) => sortOrderT) | sortOrderT) => void;
}

export function SortedControl({ defaultValue, sortOrder }: SortedControlProps) {
  return (
    <SegmentedControl
      data={[
        {
          value: 'descending',
          label: (
            <>
              <Center>
                <IconSortDescending2 />
                <Box mx={5}>Newest</Box>
              </Center>
            </>
          ),
        },
        {
          value: 'ascending',
          label: (
            <>
              <Center>
                <IconSortAscending2 />
                <Box mx={5}>Oldest</Box>
              </Center>
            </>
          ),
        },
      ]}
      defaultValue={defaultValue}
      onChange={sortOrder as (value: sortOrderT) => void}
    />
  );
}
