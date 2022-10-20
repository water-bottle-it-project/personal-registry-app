import {
  ActionIcon,
  Box,
  Center,
  Group,
  HoverCard,
  SegmentedControl,
  Space,
  Text,
} from '@mantine/core';
import { IconInfoCircle, IconSortAscending2, IconSortDescending2 } from '@tabler/icons';

import type { sortOrderT } from '~types/util/sortOrderT';

interface SortedControlProps {
  defaultValue: sortOrderT;
  onChangeSortOrder: (value: ((prevState: sortOrderT) => sortOrderT) | sortOrderT) => void;
  highlight?: boolean;
}

export function SortedControl({
  defaultValue,
  onChangeSortOrder,
  highlight = false,
}: SortedControlProps) {
  return (
    <Group>
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
        onChange={onChangeSortOrder as (value: sortOrderT) => void}
      />
      <HoverCard shadow='md' width={280}>
        <HoverCard.Target>
          <ActionIcon color={highlight ? 'indigo' : undefined}>
            <IconInfoCircle />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size='sm'>Memories and photos are sorted by the end date of the memory.</Text>
          <Space h='xs' />
          <Text size='sm'>
            Sorting is disabled when searching. Search results are ranked by string relevance.
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
