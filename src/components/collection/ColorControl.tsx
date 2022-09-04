import { CheckIcon, ColorSwatch, Group, Input, useMantineTheme } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';

interface ColorControlProps {
  value: string;
  label: string;
  onChange(value: string): void;
}

export function ColorControl({ value, label, onChange, ...others }: ColorControlProps) {
  const theme = useMantineTheme();

  const colors = Object.keys(theme.colors).map(color => (
    <ColorSwatch
      color={theme.colorScheme === 'dark' ? theme.colors[color][7] : theme.colors[color][5]}
      component='button'
      key={color}
      onClick={() => onChange(color)}
      radius='xl'
      size={48}
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
  ));

  return (
    <Input.Wrapper label={upperFirst(label)} labelElement='div' {...others}>
      <Group mt={5} spacing={8}>
        {colors}
      </Group>
    </Input.Wrapper>
  );
}

ColorControl.initialValue = 'blue';
