import db from '../db';

export const pairingSchema = db.Schema({
  black: db.Schema.Types.ObjectId,
  white: db.Schema.Types.ObjectId,
  result: Number,
  handicap: Number
});

export const roundSchema = db.Schema({
  number: Number,
  finished: Boolean,
  pairings: [pairingSchema]
});

export const RoundModel = db.model("Round", roundSchema);
