import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: false },
  avatar: { type: String, required: false },
  createdTimestamp: { type: Date, required: true },
});

/**
 * Only bind model to schema if it has not been previously created: supports Next.js Hot Reload
 */
const User = mongoose.models.User || mongoose.model('User', userSchema);

export { User };
