import mongoose from 'mongoose';

import { COLORS } from '~types/util/color';

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  userId: { type: String, required: true },
  color: {
    type: String,
    required: false,
    enum: COLORS,
  },
});

collectionSchema.index({ userId: 1, title: 1 }, { unique: true });

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

export { Collection };
