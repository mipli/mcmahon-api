import mongoose from 'mongoose'
import {TournamentModel} from './models/tournament';

export function cleanDb() {
  for (const collection in mongoose.connection.collections) {
    if (mongoose.connection.collections.hasOwnProperty(collection)) {
      mongoose.connection.collections[collection].remove()
    }
  }
}

export async function addTestTournament() {
  const tournament = new TournamentModel({
    name: 'Test'
  });
  return await tournament.save();
}

export async function addTestTournamentWithPlayer() {
  const tournament = await addTestTournament();
  tournament.players = [{
    firstname: 'firstname',
    lastname: 'lastname',
  }];
  return await tournament.save();
}
