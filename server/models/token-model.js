import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  refreshToken: {type: String, required: true}
});

export default model('Token', tokenSchema)