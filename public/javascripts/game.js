import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client'
import axios from 'axios'
import Map from "./map"

const html = htm.bind(h)

const getRoom = () => {
  let url = window.location.pathname.split('/')
  return url[url.length - 1]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      player: {
        username: '',
        id: ''
      },
      game: {
        id: '',
        status: 'loading...'
      }
    }
    this.socket = io()
    this.gameId = getRoom()
  }
  componentDidMount() {
    this.updateGameState()
    // this.socket.on(emitGameEvent(this.gameId), (data) => {
    //   this.handleTimerEvent(parseInt(data))
    // })
  }
  async updateGameState() {
    let res = await axios.get(`/game/${this.gameId}/update`)
    this.setState(res.data, () => console.log(this.state))
    // console.log(res.data)
  }
  render() {
    return html`
      <div>
        <ul style="height: 80px;" class="pt-3 nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link disabled">
              Player: ${this.state.player.username}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">
              Game: ${this.state.game.id} Status: ${this.state.game.status.event}
            </a>
          </li>
        </ul>
        <div class="container-fliud m-3">
          <div class="row">
            <div class="col-12 col-xl-10">
              <div class="container">
                <${Map}/>
              </div>
            </div>
            <div class="col-12 col-xl-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Players</h5>
                  <ul class="list-group">
                    ${this.state.players.map(
                      (player, index) => html`
                        <li class="list-group-item">${index+1} - ${player.username}</li>
                      `
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="/lobby">Back to lobby</a>
        </div>
      </div>
    `
  }
}

render(html`<${App} />`, document.getElementById('app'))
