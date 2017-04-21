export const createPairing = function(players) {
  const pairings = [];
  let playerA = players.pop();
  while (playerA) {
    const pairing = {
      black: null,
      white: null,
      result: null,
      handicap: 0
    };
    const playerB = players.length > 0 ? players.pop() : null;
    const draw = nigiri(playerA, playerB);
    pairing.black = draw.black;
    pairing.white = draw.white;
    pairings.push(pairing);
    playerA = players.pop();
  }
  return pairings;
};

function nigiri(playerA, playerB) {
  if (playerA === null) {
    return {black: playerB, white: null};
  }
  if (playerB === null) {
    return {black: playerA, white: null};
  }
  if (Math.random() > 0.5) {
    return {black: playerA, white: playerB};
  } else {
    return {black: playerB, white: playerA};
  }
}
