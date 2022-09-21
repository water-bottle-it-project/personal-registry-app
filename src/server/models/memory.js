import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const memorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  firstDate: { type: Date, required: true },
  lastDate: { type: Date, required: true },
  userId: { type: String, required: true },
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  photoPreviewUrl: { type: String, required: false },
});

memorySchema.index({ userId: 'hashed', lastDate: -1 });
memorySchema.index({ collections: 1, lastDate: -1 });

memorySchema.plugin(mongoosePaginate);

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Memory = mongoose.models.Memory || mongoose.model('Memory', memorySchema);

export { Memory };
