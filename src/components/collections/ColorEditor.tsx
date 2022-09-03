import { Container, Group } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

import { ColorSwatch } from './ColorSwatch';

interface ColorEditorProps {
  selected: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

export function ColorEditor({ selected, setSelectedColor }: ColorEditorProps) {
  const colors = [
    'blue',
    'violet',
    'indigo',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
    'pink',
    'red',
    'gray',
  ];

  const Colors = colors.map(c => (
    <ColorSwatch color={c} key={c} selected={selected} setSelectedColor={setSelectedColor} />
  ));
  return (
    <Container px='xs'>
      <Group spacing='xs'>{Colors}</Group>
    </Container>
  );
}
