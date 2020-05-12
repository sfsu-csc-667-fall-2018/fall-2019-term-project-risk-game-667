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

module.exports = {
  createInitialState
}