import { createStyles, Group, useMantineTheme } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface ColorSwatchComponent {
  color: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

export function ColorSwatch({ color, setSelectedColor }: ColorSwatchComponent) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [selected, setSelected] = useState(false);

  return (
    <div
      className={classes.color}
      onClick={() => {
        setSelectedColor(color);
        setSelected(!selected);
      }}
      style={
        selected
          ? { backgroundColor: theme.colors[color][2], border: '1px solid red' }
          : { backgroundColor: theme.colors[color][2] }
      }
    />
  );
}

const useStyles = createStyles(theme => ({
  color: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  selected: {
    border: '1px solid white',
  },
}));
