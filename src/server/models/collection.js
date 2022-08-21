import mongoose from 'mongoose';

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: false },
  description: { type: mongoose.Schema.Types.Point, required: false },
  userid: { type: String, required: true },
  memoryid: { type: String, enum: ['Red'] },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

export { Collection };
