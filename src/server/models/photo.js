import mongoose from 'mongoose';

const { Schema } = mongoose;

const photoSchema = new Schema({
  caption: { type: String, required: false },
  location: { type: String, required: false },
  url: { type: String, required: true },
  userId: { type: String, required: true },
  memoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Memory' },
  memoryDate: { type: String, required: true },
  photoDate: { type: Date, required: false },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

export { Photo };
