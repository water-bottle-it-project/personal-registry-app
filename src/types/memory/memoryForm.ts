import { z } from 'zod';

const memoryFormZ = z.object({
  _id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  date: z.tuple([z.date(), z.date()]),
});

const memoryFormOmitIdZ = memoryFormZ.omit({ _id: true });

type memoryFormT = z.infer<typeof memoryFormZ>;
type memoryFormOmitId = z.infer<typeof memoryFormOmitIdZ>;

export type { memoryFormOmitId, memoryFormT };
export { memoryFormOmitIdZ, memoryFormZ };
