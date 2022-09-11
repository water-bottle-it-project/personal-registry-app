import mongoose from 'mongoose';

const { Schema } = mongoose;

const memorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  collections: {
    type: [
      {
        collectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        collectionTitle: { type: String, required: true },
      },
    ],
  },
  firstDate: { type: Date, required: true },
  lastDate: { type: Date, required: true },
  userId: { type: String, required: true },
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  photoPreviewUrl: { type: String, required: false },
});

memorySchema.index({ userId: 'hashed', lastDate: -1 });

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Memory = mongoose.models.Memory || mongoose.model('Memory', memorySchema);

export { Memory };
