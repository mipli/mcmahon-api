import db from '../db';
import {roundSchema} from './round';

const playerSchema = db.Schema({
  playerId: db.Schema.ObjectId,
  firstname: String,
  lastname: String,
  rank: String,
  score: Number
});

export const tournamentSchema = db.Schema({
  name: String,
  finished: Boolean,
  rounds: [roundSchema],
  players: [playerSchema]
});

export const TournamentModel = db.model("Tournament", tournamentSchema);
