import { Container, createStyles, Group, useMantineTheme } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

import { ColorSwatch } from './ColorSwatch';

interface ColorEditorProps {
  selected: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

export function ColorEditor({ selected, setSelectedColor }: ColorEditorProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
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
    <ColorSwatch color={c} key={c} setSelectedColor={setSelectedColor} />
  ));
  return (
    <Container px='xs'>
      <Group spacing='xs'>{Colors}</Group>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  colorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
