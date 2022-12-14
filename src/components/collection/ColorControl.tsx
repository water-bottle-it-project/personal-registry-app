import { CheckIcon, ColorSwatch, Group, Input, Tooltip, useMantineTheme } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import type { RefCallBack } from 'react-hook-form';

interface ColorControlProps {
  value: string;
  label: string;
  onChange(value: string): void;
  inputRef: RefCallBack;
}

export function ColorControl({ value, label, onChange, inputRef, ...others }: ColorControlProps) {
  const theme = useMantineTheme();

  const colors = Object.keys(theme.colors).map(color => (
    <Tooltip key={color} label={upperFirst(color)}>
      <ColorSwatch
        color={theme.colorScheme === 'dark' ? theme.colors[color][7] : theme.colors[color][5]}
        component='button'
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(color);
        }}
        radius='xl'
        size={46}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colorScheme === 'dark' ? theme.colors[color][2] : theme.white,
        }}
      >
        {value === color && <CheckIcon height={12} width={12} />}
      </ColorSwatch>
    </Tooltip>
  ));

  return (
    <Input.Wrapper label={upperFirst(label)} labelElement='div' ref={inputRef} {...others}>
      <Group mt={5} spacing={8}>
        {colors}
      </Group>
    </Input.Wrapper>
  );
}
