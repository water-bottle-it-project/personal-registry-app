import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

export default function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Tooltip
      label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
      multiline
      position='bottom-end'
      withArrow
    >
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size='lg'
        sx={theme => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.violet[6],
        })}
      >
        {colorScheme === 'dark' ? <IconSun size={19} /> : <IconMoonStars size={19} />}
      </ActionIcon>
    </Tooltip>
  );
}
