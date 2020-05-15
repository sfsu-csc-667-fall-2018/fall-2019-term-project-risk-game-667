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

const COUNTRY_COORDINATES = new Map([
  ["east-africa", [574.401, 450]],
  ["egypt", [517.5, 361.5]],
  ["congo", [506.535, 483.5]],
  ["madagascar", [589.75, 563.5]],
  ["south-africa", [516.014, 566.5]],
  ["north-africa", [450.803, 389.5]],
  ["afghanistan", [660.305, 253.145]],
  ["india", [710.5, 373.739]],
  ["irkutsk", [819.499, 188.86]],
  ["kamchatka", [933, 161]],
  ["middle-east", [595, 348.5]],
  ["mongolia", [837.375, 241]],
  ["siam", [781.5, 380]],
  ["china", [769, 300]],
  ["japan", [908, 242.5]],
  ["siberia", [749, 152.618]],
  ["ural", [685.77, 172.108]],
  ["yakutsk", [855.5, 119.5]],
  ["eastern-australia", [908, 557]],
  ["new-guinea", [921.5, 466.343]],
  ["western-australia", [805.5, 552.5]],
  ["indonesia", [820.5, 445.5]],
  ["great-britain", [434.856, 204.549]],
  ["iceland", [433, 147.672]],
  ["northern-europe", [489, 218.447]],
  ["scandinavia", [499.5, 138.5]],
  ["southern-europe", [503.073, 275]],
  ["ukraine", [585, 193.5]],
  ["western-europe", [442, 269.5]],
  ["alaska", [68, 137.451]],
  ["alberta", [161.5, 178]],
  ["central-america", [186, 319]],
  ["eastern-united-states", [255, 255]],
  ["greenland", [358.5, 95.9053]],
  ["northwest-territory", [177.033, 113.5]],
  ["ontario", [250.5, 196.056]],
  ["western-united-states", [180.126, 246]],
  ["quebec", [321.5, 189.5]],
  ["argentina", [246, 565.319]],
  ["brazil", [321.267, 455.5]],
  ["peru", [208.951, 464]],
  ["venezuela", [233, 373.5]],
]);


const COUNTRY_CONNECTIONS = new Map([
  ["great-britain", ["iceland", "scandinavia", "northern-europe", "western-europe"]],
  ["iceland", ["greenland", "scandinavia", "great-britain"]],
  ["northern-europe", ["southern-europe", "western-europe", "scandinavia", "ukraine", "great-britain"]],
  ["southern-europe", ["western-europe", "northern-europe", "ukraine", "middle-east", "egypt", "north-africa"]],
  ["scandinavia", ["iceland", "ukraine", "northern-europe", "great-britain"]],
  ["ukraine", ["ural", "afghanistan", "middle-east", "southern-europe", "northern-europe", "scandinavia"]],
  ["western-europe", ["great-britain", "southern-europe", "northern-europe", "north-africa"]],

  ["afghanistan", ["ural", "china", "india", "middle-east", "ukraine"]],
  ["india", ["china", "siam", "middle-east", "afghanistan"]],
  ["irkutsk", ["yakutsk", "mongolia", "kamchatka", "siberia"]],
  ["kamchatka", ["alaska", "yakutsk", "irkutsk", "mongolia", "japan"]],
  ["middle-east", ["southern-europe", "egypt", "ukraine", "afghanistan", "india", "east-africa"]],
  ["mongolia", ["china", "japan", "irkutsk", "siberia", "kamchatka"]],
  ["siam", ["india", "china", "indonesia"]],
  ["china", ["india", "siam", "mongolia", "afghanistan", "ural", "siberia"]],
  ["japan", ["mongolia", "kamchatka"]],
  ["siberia", ["ural", "china", "yakutsk", "irkutsk", "mongolia"]],
  ["ural", ["ukraine", "afghanistan", "china", "siberia"]],
  ["yakutsk", ["irkutsk", "siberia", "kamchatka"]],

  ["east-africa", ["middle-east", "egypt", "madagascar", "congo", "north-africa", "south-africa"]],
  ["egypt", ["north-africa", "middle-east", "east-africa", "southern-europe"]],
  ["congo", ["east-africa", "south-africa", "north-africa"]],
  ["madagascar", ["east-africa", "south-africa"]],
  ["south-africa", ["madagascar", "east-africa", "congo"]],
  ["north-africa", ["western-europe", "southern-europe", "east-africa", "egypt", "congo", "brazil"]],

  ["alaska", ["kamchatka", "northwest-territory", "alberta"]],
  ["alberta", ["ontario", "alaska", "northwest-territory", "western-united-states"]],
  ["central-america", ["western-united-states", "eastern-united-states", "venezuela"]],
  ["eastern-united-states", ["western-united-states", "central-america", "quebec", "ontario"]],
  ["greenland", ["iceland", "northwest-territory", "ontario", "quebec"]],
  ["northwest-territory", ["alaska", "alberta", "ontario", "greenland"]],
  ["ontario", ["alberta", "northwest-territory", "quebec", "western-united-states", "eastern-united-states", "greenland"]],
  ["western-united-states", ["eastern-united-states", "ontario", "alberta", "central-america"]],
  ["quebec", ["ontario", "greenland", "eastern-united-states"]],

  ["argentina", ["brazil", "peru"]],
  ["brazil", ["argentina", "peru", "north-africa", "venezuela"]],
  ["peru", ["venezuela", "argentina", "brazil"]],
  ["venezuela", ["brazil", "peru", "central-america"]],

  ["eastern-australia", ["western-australia", "new-guinea"]],
  ["new-guinea", ["eastern-australia", "indonesia"]],
  ["western-australia", ["eastern-australia", "new-guinea", "indonesia"]],
  ["indonesia", ["siam", "new-guinea", "western-australia", "eastern-australia"]]
]);


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
  COUNTRY_CONNECTIONS,
  COUNTRY_COORDINATES,
}
