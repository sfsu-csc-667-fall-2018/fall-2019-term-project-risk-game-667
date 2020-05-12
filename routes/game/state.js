function createInitialState() {
  const countries = new Map()
  for (const Country of Countries) {
    countries.set(Country, createInitialCountryState(Country, null));
  }
  
  const NUM_PLAYERS = 2;

  const players = [];
  for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
    players.push(createInitialPlayerState(NUM_PLAYERS));
  }
  
  const countriesLeft = Countries.slice();
  while (countriesLeft.length > 0) {
    for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
      const countryIndex = randomIndex(countriesLeft);
      const [removedCountry] = countriesLeft.splice(countryIndex, 1);
      countries.get(removedCountry).owner = playerIndex;
    }
  }
  let state = {
    country: null,
    action: {
      from: null,
      to: null,
      count: 0,
    },
    result: null,
    turn: 0,
    phase: Phase.DEPLOY,
    player: 0,
    players,
    countries,
  };

  return state;
}


function createInitialCountryState(id, owner) {
  return { id, owner, count: 1, selected: false };
}

function createInitialPlayerState(players) {
  return {
    objective: null,
    cardRetrieved: false,
    cards: [Card.INFANTRY, Card.CAVALRY, Card.ARTILLERY],
    actions: [],
    newTroops: Math.floor(InitialArmies[players] - (42 / players)),
  };
}

function nextPhase(state) {
  const startPhase = state.phase;
  if (state.phase === Phase.DEPLOY) {
    do {
      const action = state.players[state.player].actions.pop();
      const country = state.countries.get(action.id);
      if (country.owner === state.player) {
        country.count++;
      }
    } while (state.players[state.player].actions.length > 0);
    if (state.turn === 0) {
      state.players[state.player].newTroops = 3;
      state.player = (state.player + 1) % state.players.length;
      state.action.to = null;
      if (state.player === 0) {
        state.action.count = 1;
        state.phase = Phase.ATTACK;
        state.turn++;
      } 
    } else {        
      state.phase = (state.phase + 1) % 3;
      state.action.from = null;
      state.action.to = null;
      state.action.count = 1;
    }        
  } else if (state.phase === Phase.ATTACK) {        
    if (state.action.from !== null 
     && state.action.to !== null
     && state.action.count >= 1) {          
      state.players[state.player].actions.push({
        from: state.action.from,
        to: state.action.to,
        count: state.action.count,
      });
      
      state.action.from = null;
      state.action.to = null;
      state.action.count = 1;          
    }        
    if (state.players[state.player].actions.length > 0) {          
      do {            
        const action = state.players[state.player].actions.pop();
        const from = state.countries.get(action.from);
        const to = state.countries.get(action.to);
        state.result = resolveAttack(action.count, to.count);
        if (state.result.value === AttackResult.WIN) {
          if (to.count - action.count <= 0) {
            from.count -= action.count;
            to.count = action.count;
            to.owner = state.player;
            if (!state.players[state.player].cardRetrieved) {
              state.players[state.player].cardRetrieved = true;
              state.players[state.player].cards.push(randomInt(0, 2));
            }
          }
        } else if (state.result.value === AttackResult.DRAW) {
          if (to.count - 1 <= 0) {
            from.count -= action.count;
            to.count = action.count - 1;
            to.owner = state.player;
          } else {
            to.count--;
            from.count--;
            action.count--;
          }
        } else if (state.result.value === AttackResult.LOSE) {
          if (action.count - to.count <= 0) {
            from.count -= action.count;
          } else {
            from.count -= to.count;
            action.count -= to.count;
          }
        }
      } while (state.players[state.player].actions.length > 0);
      console.log(state.action);          
      let troopCount = 0;
      let countryCount = 0;
      for (const [id, countryState] of state.countries) {
        if (countryState.owner === state.player) {
          countryCount++;
          troopCount += countryState.count;
        }
      }
      if (troopCount === countryCount) {
        state.phase = (state.phase + 1) % 3;
        state.result = null;
      }
    } else {
      state.phase = (state.phase + 1) % 3;
      state.result = null;
    }
    state.action.from = null;
    state.action.to = null;
    state.action.count = 1;
  } else if (state.phase === Phase.MOVE) {
    if (state.action.from !== null && state.action.to !== null && state.action.count >= 1) {
      state.players[state.player].actions.push({
        from: state.action.from,
        to: state.action.to,
        count: state.action.count,
      });
      state.action.from = null;
      state.action.to = null;
      state.action.count = 1;
    }
    if (state.players[state.player].actions.length > 0) {
      do {
        const action = state.players[state.player].actions.pop();
        const from = state.countries.get(action.from);
        const to = state.countries.get(action.to);
        from.count -= action.count;
        to.count += action.count;
      } while (state.players[state.player].actions.length > 0);
    } else {
      state.phase = (state.phase + 1) % 3;
    }
  }
  if (startPhase !== state.phase && state.phase === Phase.DEPLOY) { 
    state.player = (state.player + 1) % state.players.length;
    if (state.player === 0) {
      state.turn++;
    }
    // TODO: calculate how many new troops correspond to the player
    if (state.turn > 0) {
      let numberOfCountries = 0;
      const ownedCountries = [];
      const ownedContinents = [];
      for (const [countryId, countryState] of state.countries) {
        if (countryState.owner === state.player) {
          numberOfCountries++;
          ownedCountries.push(countryId);
        }
      }
      const troopsPerCountry = Math.max(3, Math.floor(numberOfCountries / 3));
      let troopsPerContinent = 0;
      for (const [continentId, continentCountries] of Continents) {
        let ownedContinentCountries = 0;
        for (const continentCountryId of continentCountries) {
          if (ownedCountries.includes(continentCountryId)) {
            ownedContinentCountries++;
          }
        }
        if (ownedContinentCountries === continentCountries.length) {
          troopsPerContinent += ContinentBonuses.get(continentId);
          ownedContinents.push(continentId);
        }
      }
      const newTroops = state.players[state.player].newTroops = troopsPerContinent + troopsPerCountry;
    }
  }
  return state
}


function resolveAttack(attack, defense) {
  const attackResults = rollDices(Math.min(3, attack));
  const defenseResults = rollDices(Math.min(2, defense));
  
  const attackResultsToShow = attackResults.slice();
  const defenseResultsToShow = defenseResults.slice();
  
  attackResults.sort();
  defenseResults.sort();
  
  for (let i = 0; i < attackResults.length; i++) {
    const attackResult = attackResults[i];
    for (let j = 0; j < defenseResults.length; j++) {
      const defenseResult = defenseResults[j];
      if (attackResult > defenseResult) {
        defenseResults.splice(j, 1);
      }
    }
  }
  
  return {
    value: getResultsValue(defenseResultsToShow.length, defenseResults.length),
    attack: attackResultsToShow,
    defense: defenseResultsToShow,
  };
}


function rollDices(count) {
  const results = [];
  for (let index = 0; index < count; index++) {
    results.push(rollDice());
  }
  return results;
}


function rollDice() {
  return randomInt(1, 6);
}


function getResultsValue(initialDefenseDices, finalDefenseDices) {
  if (initialDefenseDices === finalDefenseDices) {
    return AttackResult.LOSE;
  } else if (initialDefenseDices !== finalDefenseDices) {
    if (initialDefenseDices === 2 && finalDefenseDices === 1) {
      return AttackResult.DRAW;
    }
    return AttackResult.WIN;
  }
}

function randomIndex(list) {
  return randomInt(0, list.length - 1);
}

function randomInt(min, max) {
  return Math.round(randomFloat(min, max));
}

function randomFloat(min, max) {
  return linear(Math.random(), min, max);
}

function linear(value, min, max) {
  return (value * (max - min)) + min;
}

const Phase = {
  DEPLOY: 0,
  ATTACK: 1,
  MOVE: 2
};


const Card = {
  INFANTRY: 0,
  CAVALRY: 1,
  ARTILLERY: 2
};

const InitialArmies = [
  0, 0, 40, 35, 30, 25, 20
];


const Countries = [
  "great-britain",
  "iceland",
  "northern-europe",
  "southern-europe",
  "scandinavia",
  "ukraine",
  "western-europe",

  "afghanistan",
  "india",
  "irkutsk",
  "kamchatka",
  "middle-east",
  "mongolia",
  "siam",
  "china",
  "japan",
  "siberia",
  "ural",
  "yakutsk",

  "east-africa",
  "egypt",
  "congo",
  "madagascar",
  "south-africa",
  "north-africa",

  "alaska",
  "alberta",
  "central-america",
  "eastern-united-states",
  "greenland",
  "northwest-territory",
  "ontario",
  "western-united-states",
  "quebec",

  "argentina",
  "brazil",
  "peru",
  "venezuela",

  "eastern-australia",
  "new-guinea",
  "western-australia",
  "indonesia"
];

const Continents = new Map([
  [
    "africa",
    [
      "east-africa",
      "egypt",
      "congo",
      "madagascar",
      "south-africa",
      "north-africa"
    ]
  ],
  [
    "asia",
    [
      "afghanistan",
      "india",
      "irkutsk",
      "kamchatka",
      "middle-east",
      "mongolia",
      "siam",
      "china",
      "japan",
      "siberia",
      "ural",
      "yakutsk"
    ]
  ],
  [
    "oceania",
    [
      "eastern-australia",
      "new-guinea",
      "western-australia",
      "indonesia"
    ]
  ],
  [
    "europe",
    [
      "great-britain",
      "iceland",
      "northern-europe",
      "scandinavia",
      "southern-europe",
      "ukraine",
      "western-europe"
    ]
  ],
  [
    "north-america",
    [
      "alaska",
      "alberta",
      "central-america",
      "eastern-united-states",
      "greenland",
      "northwest-territory",
      "ontario",
      "western-united-states",
      "quebec"
    ]
  ],
  [
    "south-america",
    [
      "argentina",
      "brazil",
      "peru",
      "venezuela"
    ]
  ]
])

const AttackResult = {
  WIN: 0,
  DRAW: 1,
  LOSE: 2,
};

module.exports = {
  createInitialState,
  nextPhase,
}