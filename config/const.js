const ROOM_LIMIT = 2
const NUM_PLAYERS = 2

const USER_TABLE = 'user_table'
const MESSAGE_TABLE = 'message_table'
const GAME_TABLE = 'game_table'

const Phase = {
  DEPLOY: 0,
  ATTACK: 1,
  MOVE: 2,
  STARTED: 3,
  FINISHED: 4,
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

const ContinentBonuses = new Map([
  ["asia", 7],
  ["africa", 3],
  ["europe", 5],
  ["oceania", 2],
  ["north-america", 5],
  ["south-america", 2]
]);

const AttackResult = {
  WIN: 0,
  DRAW: 1,
  LOSE: 2,
};

module.exports = {
  ROOM_LIMIT,
  NUM_PLAYERS,
  USER_TABLE,
  MESSAGE_TABLE,
  GAME_TABLE,
  // TODO change the formatting
  Phase,
  InitialArmies,
  Countries,
  Continents,
  ContinentBonuses,
  AttackResult,
}
