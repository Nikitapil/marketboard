import { model, Schema } from 'mongoose';

const Product = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: ''},
  photoLinks: [{type: String}],
  mainPhoto: {type: String},
  price: {type: String, default: ''},
  contacts: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

export default model('Product', Product);