import { COUNTRY_CONNECTIONS } from '../../../config/const'

function isOwned(from, state) {
  const countryState = state.countries.get(from)
  return countryState.owner === state.player
}

function isOwnedAndHasTroops(from, state) {
  const countryState = state.countries.get(from)
  if (countryState.owner === state.player && countryState.count > 1) {
    return true
  }
  return false
}

function isConnectedAndOwned(from, to, state) {
  if (isConnectedTo(from, to)) {
    return state.countries.get(to).owner === state.countries.get(from).owner
  }
  return false
}

function isConnectedAndNotOwned(from, to, state) {
  if (isConnectedTo(from, to)) {
    return state.countries.get(to).owner !== state.countries.get(from).owner
  }
  return false
}

function isConnectedTo(from, to) {
  let country = COUNTRY_CONNECTIONS.get(from)
  if (!country) {
    return false
  }
  return country.includes(to)
}

// TODO not sure if needed paranthesis
function radiansToDegrees(value) {
  return value * (180 / Math.PI)
}

let deserializeState = (state) => {
  return {
    winner: state.winner,
    playerId: state.playerId,
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
    winner: state.winner,
    playerId: state.playerId,
    action: state.action,
    result: state.result,
    turn: state.turn,
    phase: state.phase,
    player: state.player,
    players: state.players,
    countries: [...state.countries],
  }
}

export {
  radiansToDegrees,
  isConnectedTo,
  isConnectedAndNotOwned,
  isConnectedAndOwned,
  isOwnedAndHasTroops,
  isOwned,
  serializeState,
  deserializeState,
}
