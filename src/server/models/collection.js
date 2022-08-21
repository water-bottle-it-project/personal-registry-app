import mongoose from 'mongoose';

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  userId: { type: String, required: true, ref: 'User' },
  color: {
    type: String,
    required: false,
    enum: [
      'gray',
      'red',
      'pink',
      'grape',
      'violet',
      'indigo',
      'blue',
      'cyan',
      'teal',
      'green',
      'lime',
      'yellow',
      'orange',
    ],
  },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

export { Collection };
