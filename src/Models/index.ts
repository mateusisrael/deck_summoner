import mongoose, { mongo } from 'mongoose';

const ChampScheema = new mongoose.Schema({
  version: String,
  id: String,
  key: String,
  name: String,
  title: String,
  blurb: String,
  info: Object,
  image: Object,
  tags: Array,
  partype: String,
  stats: Object
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const UserModel = mongoose.model('Users', UserSchema);
export const ChampModel = mongoose.model('champions', ChampScheema);