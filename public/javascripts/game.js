const i18n = {
  en: {
    phases: ["Deploy troops", "Attack!", "Move Troops", "Loading"],
    players: [
      "Red",
      "Green",
      "Blue",
      "Yellow",
      "Purple",
      "Black",
    ],
    turn: "Turn",
    from: "from",
    to: "to",
    minus: "-",
    plus: "+",
    player: "Player",
    phase: "Phase",
    country: "Country",
    countries: new Map([
      ["great-britain", "Gran Britain"],
      ["iceland", "Iceland"],
      ["northern-europe", "Northern Europe"],
      ["southern-europe", "Southern Europe"],
      ["scandinavia", "Scandinavia"],
      ["ukraine", "Ukraine"],
      ["western-europe", "Western Europe"],

      ["afghanistan", "Afganistan"],
      ["india", "India"],
      ["irkutsk", "Irkutsk"],
      ["kamchatka", "Kamchatka"],
      ["middle-east", "Middle East"],
      ["mongolia", "Mongolia"],
      ["siam", "Siam"],
      ["china", "China"],
      ["japan", "Japan"],
      ["siberia", "Siberia"],
      ["ural", "Ural"],
      ["yakutsk", "Yakutsk"],

      ["east-africa", "Eastern Africa"],
      ["egypt", "Egypt"],
      ["congo", "Congo"],
      ["madagascar", "Madagascar"],
      ["south-africa", "Southern África"],
      ["north-africa", "Northern África"],

      ["alaska", "Alaska"],
      ["alberta", "Alberta"],
      ["central-america", "Central America"],
      ["eastern-united-states", "Eastern US"],
      ["greenland", "Greenland"],
      ["northwest-territory", "Northwest"],
      ["ontario", "Ontario"],
      ["western-united-states", "Western US"],
      ["quebec", "Quebec"],

      ["argentina", "Argentina"],
      ["brazil", "Brasil"],
      ["peru", "Peru"],
      ["venezuela", "Venezuela"],

      ["eastern-australia", "Eastern Australia"],
      ["new-guinea", "New Guinea"],
      ["western-australia", "Western Australia"],
      ["indonesia", "Indonesia"]
    ])
  },
};

const CountryCoordinates = new Map([
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


const CountryConnections = new Map([
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


const Phase = {
  DEPLOY: 0,
  ATTACK: 1,
  MOVE: 2,
  LOADING: 3
};

const Card = {
  INFANTRY: 0,
  CAVALRY: 1,
  ARTILLERY: 2
};

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function isOwned(from, state) {
  const countryState = state.countries.get(from);
  return countryState.owner === state.player;
}

function isOwnedAndHasTroops(from, state) {
  const countryState = state.countries.get(from);
  if (countryState.owner === state.player && countryState.count > 1) {
    return true;
  }
  return false;
}

function isConnectedAndOwned(from, to, state) {
  if (isConnectedTo(from, to)) {
    return state.countries.get(to).owner === state.countries.get(from).owner;
  }
  return false;
}

function isConnectedAndNotOwned(from, to, state) {
  if (isConnectedTo(from, to)) {
    return state.countries.get(to).owner !== state.countries.get(from).owner;
  }
  return false;
}

function isConnectedTo(from, to) {
  let country = CountryConnections.get(from)
  if(!country) {
    return false
  }
  return country.includes(to);
}

function degreesToRadians(value) {
  return value * DEG_TO_RAD;
}

function radiansToDegrees(value) {
  return value * RAD_TO_DEG;
}

const store = new Vuex.Store({
  state: {
    isLoading: true,
    country: null,
    action: {
      from: null,
      to: null,
      count: 0,
    },
    result: null,
    turn: 0,
    phase: Phase.LOADING,
    player: 0,
    players: [],
    countries: [],
  },
  mutations: {
    updateState(state, payload) {
      console.log("UPDATED A GAME STATE", payload.state)
      state.isLoading = payload.state.isLoading
      state.country = payload.state.country
      state.action = payload.state.action
      state.result = payload.state.result
      state.turn = payload.state.turn
      state.phase = payload.state.phase
      state.player = payload.state.player
      state.players = payload.state.players
      state.countries = payload.state.countries
    },
    enterCountry(state, payload) {
      state.country = payload.id;
      state.countries.get(state.country).selected = true;
    },
    leaveCountry(state, payload) {
      state.countries.get(state.country).selected = false;
      state.country = payload.id;
    },
    deployTroop(state, payload) {
      state.players[state.player].actions.push({ id: state.action.to });
    },
    gatherTroop(state) {
      const index = state.players[state.player].actions.findIndex(action => action.id === state.action.to);
      if (index < 0) {
        console.error('Cannot retrieve troops');
      }
      const [removedAction] = state.players[state.player].actions.splice(index, 1);
    },    
    actionFrom(state, payload) {
      state.action.from = payload.id;
    },
    actionTo(state, payload) {
      state.action.to = payload.id;
    },    
    actionIncrement(state) {
      const countryState = state.countries.get(state.action.from);
      if (countryState.count - state.action.count > 1) {
        state.action.count++;
      }
    },
    actionDecrement(state) {
      if (state.action.count > 1) {
        state.action.count--;
      }
    },
  },
  actions: {
    updateState(context, payload) {
      context.commit('updateState', payload);
    },
    enterCountry(context, payload) {
      context.commit('enterCountry', payload);
    },
    leaveCountry(context, payload) {
      context.commit('leaveCountry', payload);
    },
    deployTroop(context, payload) {
      context.commit('deployTroop', payload);
    },
    gatherTroop(context, payload) {
      context.commit('gatherTroop', payload);
    },
    moveFrom(context, payload) {
      context.commit('moveFrom', payload);
    },
    moveTo(context, payload) {
      context.commit('moveTo', payload);
    },
    actionFrom(context, payload) {
      context.commit('actionFrom', payload);
    },
    actionTo(context, payload) {
      context.commit('actionTo', payload);
    },
    actionIncrement(context) {
      context.commit('actionIncrement');
    },
    actionDecrement(context) {
      context.commit('actionDecrement');
    },
    nextPhase(context) {
      context.commit('nextPhase');
    }
  }
})

let deserializeState = (state) => {
  return {
    country: state.country,
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: new Map(state.countries),
  }
}

let serializeState = (state) => {
  return {
    country: state.country,
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: [...state.countries],
  }
}

const gameId = (function() {
  let url = window.location.pathname.split('/')
  return url[url.length - 1]
})()

let PLAYER_INDEX

;(async function() {
  let res = await axios.get(`/game/${gameId}/update`)
  let {
    players,
    player
  } = res.data
  for(let i = 0; i < players.length; i++) {
    if(players[i].player_id === player.id) {
      PLAYER_INDEX = i
      return
    }
  }
})()


const vm = new Vue({
  el: '#app',
  store,
  mounted: async function(){
    let state = await this.getState()
    state.isLoading = false
    const { $store: { dispatch } } = this;
    dispatch('updateState', { state });

    socket.on(`GAME EVENT ${gameId}`, async (msg) => {
      const { $store: { dispatch } } = this;
      let state = await this.getState()
      dispatch('updateState', { state });
    })
    
  },
  methods: {
    async getState () {
      let res = await axios.get(`/game/${gameId}/update`)
      return deserializeState(res.data.game.state)
    },
    async postState (state) {
      console.log('SENDING A GAME STATE', state)
      let res = await axios.post(`/game/${gameId}/update`, {
        state: serializeState(state)
      })
      return res.data
    },
    isLoading() {
      const { $store: { state } } = this;
      return state.isLoading;
    },
    getDiceClasses(type, index) {
      const { $store: { state } } = this;
      if (this.$store.state.result) {
        if (type === 'attack') {
          return ['attack-dice', `dice-value-${state.result[type][index]}`];
        } else if (type === 'defense') {
          return ['defense-dice', `dice-value-${state.result[type][index]}`];
        }
      }
      return 'hidden-dice';
    },
    getCountryCount(country) {
      const countryState = this.$store.state.countries.get(country);
      if (this.$store.state.phase === Phase.DEPLOY) {
        const playerIndex = this.$store.state.player;
        const playerState = this.$store.state.players[playerIndex];
        const deployedTroops = playerState.actions.filter((action) => action.id === country).length;
        return countryState.count + deployedTroops;
      }
      return countryState.count;
    },
    getCountryClasses(country) {
      const { $store: { state } } = this;
      const countryState = this.$store.state.countries.get(country);
      const classes = ['country'];
      if (state.phase === Phase.DEPLOY) {
        if ((countryState.selected === true
          && state.action.to === null 
          && countryState.owner === state.player) 
        || state.action.to === country) {
          classes.push('selected');
        }
      } else if (state.phase === Phase.ATTACK) {
        if ((countryState.selected === true 
          && state.action.from === null 
          && countryState.owner === state.player 
          && countryState.count > 1) 
        || (countryState.selected === true 
          && state.action.to === null
          && countryState.owner !== state.player 
          && isConnectedTo(state.action.from, country))) {
          classes.push('selected');
        }
      } else if (state.phase === Phase.MOVE) {
        if ((countryState.selected === true 
          && state.action.from === null
          && countryState.owner === state.player 
          && countryState.count > 1)
        || (countryState.selected === true 
          && state.action.to === null
          && countryState.owner === state.player 
          && isConnectedTo(state.action.from, country))) {
          classes.push('selected');
        }
      }
      return classes;
    },
    getTroopClasses(country) {
      const countryState = this.$store.state.countries.get(country);
      const classes = ['troop', `player-${countryState.owner}`];
      if (countryState.selected) {
        classes.push('selected');
      }
      return classes;
    },
    onEnterCountry(e) {
      const { $store: { dispatch } } = this;
      dispatch('enterCountry', { id: e.target.id });
    },
    onLeaveCountry(e) {
      const { $store: { dispatch } } = this;
      dispatch('leaveCountry', { id: null });
    },
    onClickCountry(e) {
      const { $store: { state, dispatch } } = this;
      const playerIndex = state.player;
      const playerState = state.players[playerIndex];
      if (state.phase === Phase.DEPLOY) {
        if (isOwned(e.target.id, state)) {
          dispatch('actionTo', { id: e.target.id });
        }
      } else if (state.phase === Phase.ATTACK) {
        if (state.action.from === null && isOwnedAndHasTroops(e.target.id, state)) {
          dispatch('actionFrom', { id: e.target.id });
        } else if (state.action.from !== null && state.action.to === null && isConnectedAndNotOwned(state.action.from, e.target.id, state)) {
          dispatch('actionTo', { id: e.target.id });
        } else if (state.action.from !== null && e.target.id === state.action.from) {
          dispatch('actionFrom', { id: null });
        }
      } else if (state.phase === Phase.MOVE) {
        if (state.action.from === null && isOwnedAndHasTroops(e.target.id, state)) {
          dispatch('actionFrom', { id: e.target.id });
        } else if (state.action.from !== null && state.action.to === null && isConnectedAndOwned(state.action.from, e.target.id, state)) {
          dispatch('actionTo', { id: e.target.id });
        } else if (state.action.from !== null && e.target.id === state.action.from) {
          dispatch('actionFrom', { id: null });
        }
      }
    },
    async onClickContinue(e) {
      const { $store: { dispatch, state } } = this;


      if (state.phase === Phase.DEPLOY && state.players[state.player].actions.length === state.players[state.player].newTroops) {
        let result = await this.postState(state)
        console.log(result)
      } else if (state.phase === Phase.ATTACK || state.phase === Phase.MOVE) {
        let result = await this.postState(state)
        console.log(result)
      }
    },
    onClickPlus(e) {
      const { $store: { dispatch, state } } = this;
      if ((state.phase === Phase.ATTACK || state.phase === Phase.MOVE) && state.action.from !== null && state.action.to !== null) {
        dispatch('actionIncrement');
      } else if (state.phase === Phase.DEPLOY) {
        dispatch('deployTroop');
      }
    },
    onClickMinus(e) {
      const { $store: { dispatch, state } } = this;
      if ((state.phase === Phase.ATTACK || state.phase === Phase.MOVE) && state.action.from !== null && state.action.to !== null) {
        dispatch('actionDecrement');
      } else if (state.phase === Phase.DEPLOY) {
        dispatch('gatherTroop');
      }
    }
  },
  computed: {
    isPlayersTurn() {
      const { $store: { state } } = this;
      return state.player === PLAYER_INDEX;
    },
    turn() {
      const { $store: { state } } = this;
      return `${i18n.en.turn}: ${state.turn}`;
    },
    canContinue() {
      const { $store: { state } } = this;
      const playerIndex = state.player;
      const playerState = state.players[playerIndex];
      if (state.phase === Phase.DEPLOY) {
        if (playerState.newTroops > playerState.actions.length) {
          return true;
        }
      }
      return false;
    },
    canAdd() {
      const { $store: { state } } = this;
      if (state.phase === Phase.DEPLOY && state.action.to !== null && state.players[state.player].actions.length < state.players[state.player].newTroops) {
        return false;
      }
      return !((state.phase === Phase.ATTACK || state.phase === Phase.MOVE) && state.action.from !== null && state.action.to !== null);
    },
    canSubtract() {
      const { $store: { state } } = this;
      if (state.phase === Phase.DEPLOY && state.action.to !== null && state.players[state.player].actions.length > 0) {
        return false;
      }
      return !((state.phase === Phase.ATTACK || state.phase === Phase.MOVE) && state.action.from !== null && state.action.to !== null);
    },
    canAddOrSubtract() {
      const { $store: { state } } = this;      
      return !((state.phase === Phase.ATTACK || state.phase === Phase.MOVE) && state.action.from !== null && state.action.to !== null);
    },
    countries() {
      return this.$store.state.countries;
    },
    playerName() {
      return `${i18n.en.player}: ${i18n.en.players[this.$store.state.player]}`;
    },
    phaseName() {
      const { $store: { state } } = this;
      const phase = i18n.en.phases[state.phase];
      if (state.phase === Phase.DEPLOY) {
        const current = state.players[state.player].actions.length;
        const total = state.players[state.player].newTroops;
        return `${i18n.en.phase}: ${phase} (${current}/${total})`;
      }
      if (state.action.from !== null) {
        if (state.action.to !== null) {
          return `${i18n.en.phase}: ${phase} ${i18n.en.from} ${state.action.from} ${i18n.en.to} ${state.action.to}`; 
        } else if (state.country !== null) {
          return `${i18n.en.phase}: ${phase} ${i18n.en.from} ${state.action.from} ${i18n.en.to} ${state.country}`;
        }
        return `${i18n.en.phase}: ${phase} ${i18n.en.from} ${state.action.from}`;
      }
      return `${i18n.en.phase}: ${phase}`;
    },
    countryName() {
      const { $store: { state } } = this;
      if (state.country) {
        return `${i18n.en.country}: ${i18n.en.countries.get(state.country)}`;
      }
      return '';
    },
    buttonText() {
      const { $store: { state } } = this;
      if (state.phase === Phase.DEPLOY) {
        return 'Deploy';
      } else if (state.phase === Phase.ATTACK) {
        if (state.action.from === null) {
          return 'Next';
        } else if (state.action.to !== null) {
          return `Attack with ${state.action.count} troops`;
        }
        return 'Attack';
      } else if (state.phase === Phase.MOVE) {
        if (state.action.from === null) {
          return 'Next';
        } else if (state.action.to !== null) {
          return `Move ${state.action.count} troops`;
        }
        return 'Move';
      }
    },
    minusText() {
      return i18n.en.minus;
    },
    plusText() {
      return i18n.en.plus;
    },
    warningText() {
      return "Warning";
    },
    warningClasses() {
      return "visible";
    },
    actionClasses() {
      return `player-${this.$store.state.player}`;
    },
    actionStyle() {
      const { $store: { state } } = this;
      if (state.action.from !== null) {
        const [fx, fy] = CountryCoordinates.get(state.action.from);
        if (state.action.to !== null) {
          const [tx, ty] = CountryCoordinates.get(state.action.to);
          const dx = tx - fx;
          const dy = ty - fy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const s = d / 150;
          return {
            strokeWidth: 1.5 * (1 / s)
          };
        } else if (state.country !== null) {
          const [tx, ty] = CountryCoordinates.get(state.country);
          const dx = tx - fx;
          const dy = ty - fy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const s = d / 150;
          return {
            strokeWidth: 1.5 * (1 / s)
          };
        }
      }
      return {
        strokeWidth: 1.5
      };
    },
    actionTransform() {
      const { $store: { state } } = this;
      if (state.action.from !== null) {
        const [fx, fy] = CountryCoordinates.get(state.action.from);
        if (state.action.to !== null) {
          const [tx, ty] = CountryCoordinates.get(state.action.to);
          const dx = tx - fx;
          const dy = ty - fy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const s = d / 150;
          const rotation = radiansToDegrees(Math.atan2(dy,dx));
          return `translate(${fx},${fy}) rotate(${rotation}) scale(${s},${s})`;
        } else if (state.country !== null && (state.phase === Phase.ATTACK && isConnectedAndNotOwned(state.action.from, state.country, state)) || (state.phase === Phase.MOVE && isConnectedAndOwned(state.action.from, state.country, state))) {
          const [tx, ty] = CountryCoordinates.get(state.country);
          const dx = tx - fx;
          const dy = ty - fy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const s = d / 150;
          const rotation = radiansToDegrees(Math.atan2(dy,dx));
          return `translate(${fx},${fy}) rotate(${rotation}) scale(${s},${s})`;
        } else {
          return "scale(0,0)";
        }
      } else {
        return "scale(0,0)";
      }
    }
  }
})

const socket = io()