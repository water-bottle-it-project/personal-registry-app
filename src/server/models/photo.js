import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const photoSchema = new Schema({
  caption: { type: String, required: false },
  location: { type: String, required: false },
  url: { type: String, required: true },
  userId: { type: String, required: true },
  memoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Memory' },
  memoryDate: { type: Date, required: true },
  photoDate: { type: Date, required: false },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
});

photoSchema.index({ userId: 'hashed', memoryDate: -1 });

photoSchema.plugin(mongoosePaginate);
photoSchema.plugin(mongooseAggregatePaginate);

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

export { Photo };
