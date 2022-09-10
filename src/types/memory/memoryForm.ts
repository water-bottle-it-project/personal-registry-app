import { z } from 'zod';

import { photoFormCreateRequestZ, photoFormCreateZ } from '~types/photo/photo';

const memoryEditForm = z.object({
  _id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  date: z.tuple([z.date(), z.date()]),
  photos: photoFormCreateZ.array().default([]),
});

const memoryCreateForm = memoryEditForm.omit({ _id: true });

const memoryCreateFormRequest = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  firstDate: z.date(),
  lastDate: z.date(),
  photos: photoFormCreateRequestZ.array().default([]),
});

type memoryEditFormT = z.infer<typeof memoryEditForm>;
type memoryCreateFormT = z.infer<typeof memoryCreateForm>;
type memoryCreateFormRequestT = z.infer<typeof memoryCreateFormRequest>;

export type { memoryCreateFormRequestT, memoryCreateFormT, memoryEditFormT };
export { memoryCreateForm, memoryCreateFormRequest, memoryEditForm };
