import mongoose from 'mongoose';

const { Schema } = mongoose;

const photoSchema = new Schema({
  caption: { type: String, required: false },
  location: { type: mongoose.Schema.Types.Point, required: false },
  url: { type: String, required: false },
  userid: { type: String, required: true },
  memoryid: { type: String, required: true },
  date: { type: Date, required: false },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

export { Photo };
