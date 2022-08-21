import mongoose from 'mongoose';

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  userid: { type: String, required: true, ref: 'User' },
  memoryid: { type: String, enum: ['red', 'blue', 'green'] },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

export { Collection };
