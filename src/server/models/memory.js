import mongoose from 'mongoose';

const { Schema } = mongoose;

const memorySchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  collections: [{ collectionId: String, collectionTitle: String }],
  first_date: { type: Date, required: true },
  last_date: { type: Date, required: true },
  userid: { type: String, required: true },
  photos: [{ photoId: String }],
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Memory = mongoose.models.Memory || mongoose.model('Memory', memorySchema);

export { Memory };