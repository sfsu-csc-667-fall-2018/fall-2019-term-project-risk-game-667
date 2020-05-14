const db = require('.')

// function newState(id, turn, phase, currentPlayer, action, player1, player2, result, countries, country) {
//   return new Promise((resolve) => {
//     db.any(
//       `INSERT INTO game_state_table 
//       ("id", "turn", "phase", "current_player", "action", "player_1", "player_2", "result", "countries", "country") 
//       VALUES 
//       ('${id}', '${turn}', '${phase}', '${currentPlayer}', '${action}', '${player1}', '${player2}', '${result}', '${countries}', '${country}');`
//     )
//       .then((results) => {
//         resolve({ error: undefined })
//       })
//       .catch((error) => {
//         console.log(error)
//         resolve({ error: 'Error creating a new state!', code: 500 })
//       })
//   })
// }

function updateState(id, turn, phase, currentPlayer, action, player1, player2, result, countries, country) {
  return new Promise((resolve) => {
    db.any(
      `UPDATE game_state_table
       SET "turn" = '${turn}',
       "phase" = '${phase}',
       "current_player" = '${currentPlayer}',
       "action" = '${action}',
       "player_1" = '${player1}',
       "player_2" = '${player2}',
       "result" = '${result}',
       "countries" = '${countries}',
       "country" = '${country}' 
       WHERE "id" = '${id}';`
    )
      .then((results) => {
        resolve({ error: undefined })
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error updating state!', code: 500 })
      })
  })
}

function getState(id) {
  return new Promise((resolve) => {
    db.any(
      `SELECT * FROM game_state_table  WHERE "id" = '${id}';`
    )
      .then((results) => {
        resolve(results[0])
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error getting state!', code: 500 })
      })
  })
}
// TODO some names are not discriptive
function addSecondPlayer(id, player2) {
  return new Promise((resolve) => {
    db.any(
      `UPDATE game_state_table SET player_2 = '${player2}' WHERE id = '${id}' AND player_2 = 'null'`
    )
      .then((results) => {
        resolve(results[0])
      })
      .catch((error) => {
        console.log(error)
        resolve({ error: 'Error getting state!', code: 500 })
      })
  })
}

module.exports = {
  newState,
  getState,
  updateState,
  addSecondPlayer
}

// TODO rewrite add second player with this query
// UPDATE game_state_table 
// SET player_2 = null 
// WHERE id = 'b5609a2e398' 
// AND player_2 = 'null' 
// AND player_1 <> '{"id":"ffb622df7e9926a3b77284dcb024a2ca667e1c474dd644321e90a16330107519","actions":[],"newTroops":19}'