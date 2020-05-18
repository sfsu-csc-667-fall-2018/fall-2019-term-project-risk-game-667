import { gameEvent } from '../../../config/events'
import { i18n } from '../../../config/locales'
import { PHASE, COUNTRY_COORDINATES } from '../../../config/const'

import {
  radiansToDegrees,
  isConnectedTo,
  isConnectedAndNotOwned,
  isConnectedAndOwned,
  isOwnedAndHasTroops,
  isOwned,
  serializeState,
  deserializeState,
} from './util'

import store from './store'
const socket = io()
const gameId = (function () {
  let url = window.location.pathname.split('/')
  return url[url.length - 1]
})()

const vm = new Vue({
  el: '#app',
  store,
  mounted: async function () {
    let state = await this.getState()
    const {
      $store: { dispatch },
    } = this
    dispatch('updateState', { state })

    socket.on(gameEvent(gameId), async (msg) => {
      const {
        $store: { dispatch },
      } = this
      let state = await this.getState()
      dispatch('updateState', { state })
    })
  },
  methods: {
    async getState() {
      let res = await axios.get(`/game/${gameId}/update`)
      return deserializeState(res.data.state)
    },
    async postState(state) {
      let res = await axios.post(`/game/${gameId}/update`, {
        state: serializeState(state),
      })
      return res.data
    },
    getDiceClasses(type, index) {
      const {
        $store: { state },
      } = this
      if (this.$store.state.result) {
        if (type === 'attack') {
          return ['attack-dice', `dice-value-${state.result[type][index]}`]
        } else if (type === 'defense') {
          return ['defense-dice', `dice-value-${state.result[type][index]}`]
        }
      }
      return 'hidden-dice'
    },
    getCountryCount(country) {
      const countryState = this.$store.state.countries.get(country)
      if (this.$store.state.phase === PHASE.DEPLOY) {
        const playerIndex = this.$store.state.player
        const playerState = this.$store.state.players[playerIndex]
        const deployedTroops = playerState.actions.filter(
          (action) => action.id === country
        ).length
        return countryState.count + deployedTroops
      }
      return countryState.count
    },
    getCountryClasses(country) {
      const {
        $store: { state },
      } = this
      const countryState = this.$store.state.countries.get(country)
      const classes = ['country']
      if (state.phase === PHASE.DEPLOY) {
        if (
          (countryState.selected === true &&
            state.action.to === null &&
            countryState.owner === state.player) ||
          state.action.to === country
        ) {
          classes.push('selected')
        }
      } else if (state.phase === PHASE.ATTACK) {
        if (
          (countryState.selected === true &&
            state.action.from === null &&
            countryState.owner === state.player &&
            countryState.count > 1) ||
          (countryState.selected === true &&
            state.action.to === null &&
            countryState.owner !== state.player &&
            isConnectedTo(state.action.from, country))
        ) {
          classes.push('selected')
        }
      } else if (state.phase === PHASE.MOVE) {
        if (
          (countryState.selected === true &&
            state.action.from === null &&
            countryState.owner === state.player &&
            countryState.count > 1) ||
          (countryState.selected === true &&
            state.action.to === null &&
            countryState.owner === state.player &&
            isConnectedTo(state.action.from, country))
        ) {
          classes.push('selected')
        }
      }
      return classes
    },
    getTroopClasses(country) {
      const countryState = this.$store.state.countries.get(country)
      const classes = ['troop', `player-${countryState.owner}`]
      if (countryState.selected) {
        classes.push('selected')
      }
      return classes
    },
    onEnterCountry(e) {
      const {
        $store: { dispatch },
      } = this
      dispatch('enterCountry', { id: e.target.id })
    },
    onLeaveCountry(e) {
      const {
        $store: { dispatch },
      } = this
      dispatch('leaveCountry', { id: null })
    },
    onClickCountry(e) {
      const {
        $store: { state, dispatch },
      } = this
      const playerIndex = state.player
      const playerState = state.players[playerIndex]
      if (state.phase === PHASE.DEPLOY) {
        if (isOwned(e.target.id, state)) {
          dispatch('actionTo', { id: e.target.id })
        }
      } else if (state.phase === PHASE.ATTACK) {
        if (
          state.action.from === null &&
          isOwnedAndHasTroops(e.target.id, state)
        ) {
          dispatch('actionFrom', { id: e.target.id })
        } else if (
          state.action.from !== null &&
          state.action.to === null &&
          isConnectedAndNotOwned(state.action.from, e.target.id, state)
        ) {
          dispatch('actionTo', { id: e.target.id })
        } else if (
          state.action.from !== null &&
          e.target.id === state.action.from
        ) {
          dispatch('actionFrom', { id: null })
        }
      } else if (state.phase === PHASE.MOVE) {
        if (
          state.action.from === null &&
          isOwnedAndHasTroops(e.target.id, state)
        ) {
          dispatch('actionFrom', { id: e.target.id })
        } else if (
          state.action.from !== null &&
          state.action.to === null &&
          isConnectedAndOwned(state.action.from, e.target.id, state)
        ) {
          dispatch('actionTo', { id: e.target.id })
        } else if (
          state.action.from !== null &&
          e.target.id === state.action.from
        ) {
          dispatch('actionFrom', { id: null })
        }
      }
    },
    async onClickContinue(e) {
      const {
        $store: { dispatch, state },
      } = this
      if (
        state.phase === PHASE.DEPLOY &&
        state.players[state.player].actions.length ===
          state.players[state.player].newTroops
      ) {
        let result = await this.postState(state)
      } else if (state.phase === PHASE.ATTACK || state.phase === PHASE.MOVE) {
        let result = await this.postState(state)
      }
    },
    onClickPlus(e) {
      const {
        $store: { dispatch, state },
      } = this
      if (
        (state.phase === PHASE.ATTACK || state.phase === PHASE.MOVE) &&
        state.action.from !== null &&
        state.action.to !== null
      ) {
        dispatch('actionIncrement')
      } else if (state.phase === PHASE.DEPLOY) {
        dispatch('deployTroop')
      }
    },
    onClickMinus(e) {
      const {
        $store: { dispatch, state },
      } = this
      if (
        (state.phase === PHASE.ATTACK || state.phase === PHASE.MOVE) &&
        state.action.from !== null &&
        state.action.to !== null
      ) {
        dispatch('actionDecrement')
      } else if (state.phase === PHASE.DEPLOY) {
        dispatch('gatherTroop')
      }
    },
  },
  computed: {
    turn() {
      const {
        $store: { state },
      } = this
      return `${i18n.en.turn}: ${state.turn}`
    },
    canContinue() {
      const {
        $store: { state },
      } = this
      const playerIndex = state.player
      const playerState = state.players[playerIndex]
      if (state.phase === PHASE.DEPLOY) {
        if (playerState.newTroops > playerState.actions.length) {
          return true
        }
      }
      return false
    },
    canAdd() {
      const {
        $store: { state },
      } = this
      if (
        state.phase === PHASE.DEPLOY &&
        state.action.to !== null &&
        state.players[state.player].actions.length <
          state.players[state.player].newTroops
      ) {
        return false
      }
      return !(
        (state.phase === PHASE.ATTACK || state.phase === PHASE.MOVE) &&
        state.action.from !== null &&
        state.action.to !== null
      )
    },
    canSubtract() {
      const {
        $store: { state },
      } = this
      if (
        state.phase === PHASE.DEPLOY &&
        state.action.to !== null &&
        state.players[state.player].actions.length > 0
      ) {
        return false
      }
      return !(
        (state.phase === PHASE.ATTACK || state.phase === PHASE.MOVE) &&
        state.action.from !== null &&
        state.action.to !== null
      )
    },
    canAddOrSubtract() {
      const {
        $store: { state },
      } = this
      return !(
        (state.phase === PHASE.ATTACK || state.phase === PHASE.MOVE) &&
        state.action.from !== null &&
        state.action.to !== null
      )
    },
    countries() {
      return this.$store.state.countries
    },
    playerTurn() {
      return (
        this.$store.state.playerId ===
        this.$store.state.players[this.$store.state.player].id
      )
    },
    gameStarted() {
      return this.$store.state.phase !== PHASE.CREATED
    },
    gameOver() {
      return this.$store.state.winner === 0 || this.$store.state.winner === 1
    },
    getWinner() {
      return this.$store.state.winner
    },
    playerName() {
      return `${i18n.en.player}: ${i18n.en.players[this.$store.state.player]}`
    },
    phaseName() {
      const {
        $store: { state },
      } = this
      const phase = i18n.en.phases[state.phase]
      if (state.phase === PHASE.DEPLOY) {
        const current = state.players[state.player].actions.length
        const total = state.players[state.player].newTroops
        return `${i18n.en.phase}: ${phase} (${current}/${total})`
      }
      if (state.action.from !== null) {
        if (state.action.to !== null) {
          return `${i18n.en.phase}: ${phase} ${i18n.en.from} ${state.action.from} ${i18n.en.to} ${state.action.to}`
        } else if (state.country !== null) {
          return `${i18n.en.phase}: ${phase} ${i18n.en.from} ${state.action.from} ${i18n.en.to} ${state.country}`
        }
        return `${i18n.en.phase}: ${phase} ${i18n.en.from} ${state.action.from}`
      }
      return `${i18n.en.phase}: ${phase}`
    },
    countryName() {
      const {
        $store: { state },
      } = this
      if (state.country) {
        return `${i18n.en.country}: ${i18n.en.countries.get(state.country)}`
      }
      return ''
    },
    buttonText() {
      const {
        $store: { state },
      } = this
      if (state.phase === PHASE.DEPLOY) {
        return 'Deploy'
      } else if (state.phase === PHASE.ATTACK) {
        if (state.action.from === null) {
          return 'Next'
        } else if (state.action.to !== null) {
          return `Attack with ${state.action.count} troops`
        }
        return 'Attack'
      } else if (state.phase === PHASE.MOVE) {
        if (state.action.from === null) {
          return 'Next'
        } else if (state.action.to !== null) {
          return `Move ${state.action.count} troops`
        }
        return 'Move'
      }
    },
    minusText() {
      return i18n.en.minus
    },
    plusText() {
      return i18n.en.plus
    },
    warningText() {
      return 'Warning'
    },
    warningClasses() {
      return 'visible'
    },
    actionClasses() {
      return `player-${this.$store.state.player}`
    },
    actionStyle() {
      const {
        $store: { state },
      } = this
      if (state.action.from !== null) {
        const [fx, fy] = COUNTRY_COORDINATES.get(state.action.from)
        if (state.action.to !== null) {
          const [tx, ty] = COUNTRY_COORDINATES.get(state.action.to)
          const dx = tx - fx
          const dy = ty - fy
          const d = Math.sqrt(dx * dx + dy * dy)
          const s = d / 150
          return {
            strokeWidth: 1.5 * (1 / s),
          }
        } else if (state.country !== null) {
          const [tx, ty] = COUNTRY_COORDINATES.get(state.country)
          const dx = tx - fx
          const dy = ty - fy
          const d = Math.sqrt(dx * dx + dy * dy)
          const s = d / 150
          return {
            strokeWidth: 1.5 * (1 / s),
          }
        }
      }
      return {
        strokeWidth: 1.5,
      }
    },
    actionTransform() {
      const {
        $store: { state },
      } = this
      if (state.action.from !== null) {
        const [fx, fy] = COUNTRY_COORDINATES.get(state.action.from)
        if (state.action.to !== null) {
          const [tx, ty] = COUNTRY_COORDINATES.get(state.action.to)
          const dx = tx - fx
          const dy = ty - fy
          const d = Math.sqrt(dx * dx + dy * dy)
          const s = d / 150
          const rotation = radiansToDegrees(Math.atan2(dy, dx))
          return `translate(${fx},${fy}) rotate(${rotation}) scale(${s},${s})`
        } else if (
          (state.country !== null &&
            state.phase === PHASE.ATTACK &&
            isConnectedAndNotOwned(state.action.from, state.country, state)) ||
          (state.phase === PHASE.MOVE &&
            isConnectedAndOwned(state.action.from, state.country, state))
        ) {
          const [tx, ty] = COUNTRY_COORDINATES.get(state.country)
          const dx = tx - fx
          const dy = ty - fy
          const d = Math.sqrt(dx * dx + dy * dy)
          const s = d / 150
          const rotation = radiansToDegrees(Math.atan2(dy, dx))
          return `translate(${fx},${fy}) rotate(${rotation}) scale(${s},${s})`
        } else {
          return 'scale(0,0)'
        }
      } else {
        return 'scale(0,0)'
      }
    },
  },
})
