import db from '../db';

const playerSchema = db.Schema({
  name: String,
  rank: Number
});

export default db.model("Player", playerSchema);
