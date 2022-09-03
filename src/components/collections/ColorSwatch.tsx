import { createStyles, useMantineTheme } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

interface ColorSwatchComponent {
  color: string;
  selected: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

export function ColorSwatch({ color, setSelectedColor, selected }: ColorSwatchComponent) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div
      className={classes.color}
      onClick={() => {
        setSelectedColor(color);
      }}
      style={
        selected === color
          ? { backgroundColor: theme.colors[color][2], border: '1px solid black' }
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
