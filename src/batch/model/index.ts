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

const ChampModel = mongoose.model('champions', ChampScheema)

export default ChampModel;