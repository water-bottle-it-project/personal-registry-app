import mongoose from 'mongoose';

const { Schema } = mongoose;

const photoSchema = new Schema({
  caption: { type: String, required: false },
  location: { type: mongoose.Schema.Types.Point, required: false },
  url: { type: String, required: true },
  userId: { type: String, required: true },
  memoryId: { type: String, required: true },
  memoryDate: { type: String, required: true },
  photoDate: { type: Date, required: false },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

export { Photo };
