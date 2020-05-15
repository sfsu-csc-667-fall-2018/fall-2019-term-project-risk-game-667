import { PHASE } from '../../../config/const'

const store = new Vuex.Store({
  state: {
    winner: null,
    playerId: null,
    country: null,
    action: {
      from: null,
      to: null,
      count: 0,
    },
    result: null,
    turn: 0,
    phase: PHASE.CREATED,
    player: 0,
    players: [],
    countries: [],
  },
  mutations: {
    updateState(state, payload) {
      console.log('UPDATED A GAME STATE', payload.state)
      state.winner = payload.state.winner
      state.playerId = payload.state.playerId
      state.action = payload.state.action
      state.result = payload.state.result
      state.turn = payload.state.turn
      state.phase = payload.state.phase
      state.player = payload.state.player
      state.players = payload.state.players
      state.countries = payload.state.countries
    },
    enterCountry(state, payload) {
      state.country = payload.id
      state.countries.get(state.country).selected = true
    },
    leaveCountry(state, payload) {
      state.countries.get(state.country).selected = false
      state.country = payload.id
    },
    deployTroop(state, payload) {
      state.players[state.player].actions.push({ id: state.action.to })
    },
    gatherTroop(state) {
      const index = state.players[state.player].actions.findIndex(
        (action) => action.id === state.action.to
      )
      if (index < 0) {
        console.error('Cannot retrieve troops')
      }
      const [removedAction] = state.players[state.player].actions.splice(
        index,
        1
      )
    },
    actionFrom(state, payload) {
      state.action.from = payload.id
    },
    actionTo(state, payload) {
      state.action.to = payload.id
    },
    actionIncrement(state) {
      const countryState = state.countries.get(state.action.from)
      if (countryState.count - state.action.count > 1) {
        state.action.count++
      }
    },
    actionDecrement(state) {
      if (state.action.count > 1) {
        state.action.count--
      }
    },
  },
  actions: {
    updateState(context, payload) {
      context.commit('updateState', payload)
    },
    enterCountry(context, payload) {
      context.commit('enterCountry', payload)
    },
    leaveCountry(context, payload) {
      context.commit('leaveCountry', payload)
    },
    deployTroop(context, payload) {
      context.commit('deployTroop', payload)
    },
    gatherTroop(context, payload) {
      context.commit('gatherTroop', payload)
    },
    moveFrom(context, payload) {
      context.commit('moveFrom', payload)
    },
    moveTo(context, payload) {
      context.commit('moveTo', payload)
    },
    actionFrom(context, payload) {
      context.commit('actionFrom', payload)
    },
    actionTo(context, payload) {
      context.commit('actionTo', payload)
    },
    actionIncrement(context) {
      context.commit('actionIncrement')
    },
    actionDecrement(context) {
      context.commit('actionDecrement')
    },
  },
})

export default store
