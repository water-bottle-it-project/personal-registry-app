import { z } from 'zod';

const emailZ = z.string().email().trim().min(1);

const COLORS = [
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

export { COLORS, colorZ, emailZ };
