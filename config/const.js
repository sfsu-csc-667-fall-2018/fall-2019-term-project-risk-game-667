const NUM_PLAYERS = 2

const USER_TABLE = 'user_table'
const MESSAGE_TABLE = 'message_table'
const GAME_TABLE = 'game_table'

const ERRORS = {
  full: 'The game you are trying to join is full!'
}

const PHASE = {
  DEPLOY: 0,
  ATTACK: 1,
  MOVE: 2,
  CREATED: 3,
  FINISHED: 4,
};


const INITIAL_ARMIES = [
  0, 0, 40, 35, 30, 25, 20
];


const COUNTRIES = [
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

const CONTINENTS = new Map([
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

const CONTINENT_BONUSES = new Map([
  ["asia", 7],
  ["africa", 3],
  ["europe", 5],
  ["oceania", 2],
  ["north-america", 5],
  ["south-america", 2]
]);

const ATTACK_RESULT = {
  WIN: 0,
  DRAW: 1,
  LOSE: 2,
};

module.exports = {
  NUM_PLAYERS,
  USER_TABLE,
  MESSAGE_TABLE,
  GAME_TABLE,
  ERRORS,
  PHASE,
  INITIAL_ARMIES,
  COUNTRIES,
  CONTINENTS,
  CONTINENT_BONUSES,
  ATTACK_RESULT,
}
