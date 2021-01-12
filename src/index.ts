import Server from './server';
import { config } from 'dotenv';
import server from './server';
import mongoose from 'mongoose';


// dotenv config
config();
const PORT = process.env.SERVER_PORT || 3000;
const DB_URI = process.env.DB_URI;

mongoose.connect(
  'mongodb://127.0.0.1:17017/deck_summoner',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("[DB] Connected"))
  .then(() => {
    server.listen(PORT, () => {
      console.log(`[API] Connected at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    new Error("[DB] DB connection problem");
  })



