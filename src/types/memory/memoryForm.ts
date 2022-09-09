import { z } from 'zod';

import { photoFormCreateZ } from '~types/photo/photo';

const memoryEditForm = z.object({
  _id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  date: z.tuple([z.date(), z.date()]),
  photos: photoFormCreateZ.array().default([]),
});

const memoryCreateForm = memoryEditForm.omit({ _id: true });

type memoryEditFormT = z.infer<typeof memoryEditForm>;
type memoryCreateFormT = z.infer<typeof memoryCreateForm>;

export type { memoryCreateFormT, memoryEditFormT };
export { memoryCreateForm, memoryEditForm };
