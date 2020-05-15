const {
  PHASE,
  INITIAL_ARMIES,
  COUNTRIES,
  CONTINENTS,
  CONTINENT_BONUSES,
  ATTACK_RESULT,
  NUM_PLAYERS,
} = require('../config/const')

function createInitialState() {
  const countries = new Map()
  for (const Country of COUNTRIES) {
    countries.set(Country, createInitialCountryState(Country, null))
  }

  const players = [createInitialPlayerState(), createInitialPlayerState()]

  const countriesLeft = COUNTRIES.slice()
  while (countriesLeft.length > 0) {
    for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
      const countryIndex = randomIndex(countriesLeft)
      const [removedCountry] = countriesLeft.splice(countryIndex, 1)
      countries.get(removedCountry).owner = playerIndex
    }
  }
  let state = {
    action: {
      from: null,
      to: null,
      count: 0,
    },
    result: null,
    turn: 0,
    phase: PHASE.CREATED,
    player: 0,
    players,
    countries,
  }

  return state
}

function createInitialCountryState(id, owner) {
  return { id, owner, count: 1, selected: false }
}

function createInitialPlayerState() {
  return {
    actions: [],
    newTroops: Math.floor(INITIAL_ARMIES[NUM_PLAYERS] - 42 / NUM_PLAYERS),
  }
}

function nextPhase(state) {
  const startPhase = state.phase
  if (state.phase === PHASE.DEPLOY) {
    do {
      const action = state.players[state.player].actions.pop()
      const country = state.countries.get(action.id)
      if (country.owner === state.player) {
        country.count++
      }
    } while (state.players[state.player].actions.length > 0)
    if (state.turn === 0) {
      state.players[state.player].newTroops = 3
      state.player = (state.player + 1) % state.players.length
      state.action.to = null
      if (state.player === 0) {
        state.action.count = 1
        state.phase = PHASE.ATTACK
        state.turn++
      }
    } else {
      state.phase = (state.phase + 1) % 3
      state.action.from = null
      state.action.to = null
      state.action.count = 1
    }
  } else if (state.phase === PHASE.ATTACK) {
    if (
      state.action.from !== null &&
      state.action.to !== null &&
      state.action.count >= 1
    ) {
      state.players[state.player].actions.push({
        from: state.action.from,
        to: state.action.to,
        count: state.action.count,
      })

      state.action.from = null
      state.action.to = null
      state.action.count = 1
    }
    if (state.players[state.player].actions.length > 0) {
      do {
        const action = state.players[state.player].actions.pop()
        const from = state.countries.get(action.from)
        const to = state.countries.get(action.to)
        state.result = resolveAttack(action.count, to.count)
        if (state.result.value === ATTACK_RESULT.WIN) {
          if (to.count - action.count <= 0) {
            from.count -= action.count
            to.count = action.count
            to.owner = state.player
          }
        } else if (state.result.value === ATTACK_RESULT.DRAW) {
          if (to.count - 1 <= 0) {
            from.count -= action.count
            to.count = action.count - 1
            to.owner = state.player
          } else {
            to.count--
            from.count--
            action.count--
          }
        } else if (state.result.value === ATTACK_RESULT.LOSE) {
          if (action.count - to.count <= 0) {
            from.count -= action.count
          } else {
            from.count -= to.count
            action.count -= to.count
          }
        }
      } while (state.players[state.player].actions.length > 0)
      console.log(state.action)
      let troopCount = 0
      let countryCount = 0
      for (const [id, countryState] of state.countries) {
        if (countryState.owner === state.player) {
          countryCount++
          troopCount += countryState.count
        }
      }
      if (troopCount === countryCount) {
        state.phase = (state.phase + 1) % 3
        state.result = null
      }
    } else {
      state.phase = (state.phase + 1) % 3
      state.result = null
    }
    state.action.from = null
    state.action.to = null
    state.action.count = 1
  } else if (state.phase === PHASE.MOVE) {
    if (
      state.action.from !== null &&
      state.action.to !== null &&
      state.action.count >= 1
    ) {
      state.players[state.player].actions.push({
        from: state.action.from,
        to: state.action.to,
        count: state.action.count,
      })
      state.action.from = null
      state.action.to = null
      state.action.count = 1
    }
    if (state.players[state.player].actions.length > 0) {
      do {
        const action = state.players[state.player].actions.pop()
        const from = state.countries.get(action.from)
        const to = state.countries.get(action.to)
        from.count -= action.count
        to.count += action.count
      } while (state.players[state.player].actions.length > 0)
    } else {
      state.phase = (state.phase + 1) % 3
    }
  }
  if (startPhase !== state.phase && state.phase === PHASE.DEPLOY) {
    state.player = (state.player + 1) % state.players.length
    if (state.player === 0) {
      state.turn++
    }
    if (state.turn > 0) {
      let numberOfCountries = 0
      const ownedCountries = []
      const ownedContinents = []
      for (const [countryId, countryState] of state.countries) {
        if (countryState.owner === state.player) {
          numberOfCountries++
          ownedCountries.push(countryId)
        }
      }
      const troopsPerCountry = Math.max(3, Math.floor(numberOfCountries / 3))
      let troopsPerContinent = 0
      for (const [continentId, continentCountries] of CONTINENTS) {
        let ownedContinentCountries = 0
        for (const continentCountryId of continentCountries) {
          if (ownedCountries.includes(continentCountryId)) {
            ownedContinentCountries++
          }
        }
        if (ownedContinentCountries === continentCountries.length) {
          troopsPerContinent += CONTINENT_BONUSES.get(continentId)
          ownedContinents.push(continentId)
        }
      }
      const newTroops = (state.players[state.player].newTroops =
        troopsPerContinent + troopsPerCountry)
    }
  }
  return state
}

function resolveAttack(attack, defense) {
  const attackResults = rollDices(Math.min(3, attack))
  const defenseResults = rollDices(Math.min(2, defense))

  const attackResultsToShow = attackResults.slice()
  const defenseResultsToShow = defenseResults.slice()

  attackResults.sort()
  defenseResults.sort()

  for (let i = 0; i < attackResults.length; i++) {
    const attackResult = attackResults[i]
    for (let j = 0; j < defenseResults.length; j++) {
      const defenseResult = defenseResults[j]
      if (attackResult > defenseResult) {
        defenseResults.splice(j, 1)
      }
    }
  }

  return {
    value: getResultsValue(defenseResultsToShow.length, defenseResults.length),
    attack: attackResultsToShow,
    defense: defenseResultsToShow,
  }
}

function rollDices(count) {
  const results = []
  for (let index = 0; index < count; index++) {
    results.push(rollDice())
  }
  return results
}

function rollDice() {
  return randomInt(1, 6)
}

function getResultsValue(initialDefenseDices, finalDefenseDices) {
  if (initialDefenseDices === finalDefenseDices) {
    return ATTACK_RESULT.LOSE
  } else if (initialDefenseDices !== finalDefenseDices) {
    if (initialDefenseDices === 2 && finalDefenseDices === 1) {
      return ATTACK_RESULT.DRAW
    }
    return ATTACK_RESULT.WIN
  }
}

function randomIndex(list) {
  return randomInt(0, list.length - 1)
}

function randomInt(min, max) {
  return Math.round(randomFloat(min, max))
}

function randomFloat(min, max) {
  return linear(Math.random(), min, max)
}

function linear(value, min, max) {
  return value * (max - min) + min
}

let formatState = (state) => {
  let players = JSON.parse(state.players_state)
  players[0].id = state.player_one
  players[1].id = state.player_two

  return {
    id: state.id,
    phase: state.phase,
    turn: state.turn,
    player: state.current_player,
    action: JSON.parse(state.current_action),
    result: JSON.parse(state.battle_result),
    players,
    countries: JSON.parse(state.countries_state),
  }
}

let serializeState = (state) => {
  return {
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: [...state.countries],
  }
}
let deserializeState = (state) => {
  return {
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: new Map(state.countries),
  }
}

let getWinner = (state) => {
  let ownershipSum = state.countries.reduce(
    (sum, country) => sum + country[1].owner,
    0
  )
  if (ownershipSum === 0) {
    return 0
  } else if (ownershipSum === 42) {
    return 1
  }
  return null
}

module.exports = {
  createInitialState,
  nextPhase,
  createInitialPlayerState,
  serializeState,
  deserializeState,
  getWinner,
  formatState,
}
