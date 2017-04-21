import db from '../db';
import {roundSchema} from './round';

export const tournamentSchema = db.Schema({
  name: String,
  finished: Boolean,
  rounds: [roundSchema]
});

export const TournamentModel = db.model("Tournament", tournamentSchema);
