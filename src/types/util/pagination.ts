import { z } from 'zod';

/**
 * Extend this wrapper with a docs field containing the zod schemas you want to include as results
 * https://github.com/aravindnc/mongoose-paginate-v2/blob/master/index.d.ts#L75
 */
const paginationWrapperZ = z.object({
  totalDocs: z.number(),
  limit: z.number(),
  hasPrevPage: z.boolean(),
  hasNextPage: z.boolean(),
  page: z.number().optional(),
  totalPages: z.number(),
  offset: z.number(),
  prevPage: z.number().nullish(),
  nextPage: z.number().nullish(),
  pagingCounter: z.number(),
});

const paginationInputZ = z.object({
  page: z.number(),
});

export { paginationInputZ, paginationWrapperZ };
