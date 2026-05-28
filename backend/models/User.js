import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  avatar:   { type: String, default: '' },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', default: null }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
