import { z } from 'zod';

const memoryZ = z.object({
  _id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  firstDate: z.date(),
  lastDate: z.date(),
});

const memoryIdOnlyZ = memoryZ.pick({ _id: true });
const memoryOmitIdZ = memoryZ.omit({ _id: true });

type memoryT = z.infer<typeof memoryZ>;
type memoryIdOnlyT = z.infer<typeof memoryIdOnlyZ>;
type memoryOmitIdT = z.infer<typeof memoryOmitIdZ>;

export type { memoryIdOnlyT, memoryOmitIdT, memoryT };
export { memoryIdOnlyZ, memoryOmitIdZ, memoryZ };
