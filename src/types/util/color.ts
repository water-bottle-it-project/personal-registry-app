import { z } from 'zod';

const COLORS = [
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
] as const;

const colorZ = z.enum(COLORS);

export { COLORS, colorZ };
