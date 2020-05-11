import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import axios from 'axios'
import io from 'socket.io-client'
import {
  emitGameCreated,
  emitGameStarted
} from '../../config/events'

const html = htm.bind(h)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
    }
    this.socket = io()
  }

  componentDidMount() {
    this.getGames()

    this.socket.on(emitGameCreated(), (data) => {
      console.log("New Game Was Created", data)
      this.getGames()
    })
    this.socket.on(emitGameStarted(), (data) => {
      console.log("Game Was Started", data)
      this.getGames()
    })
  }

  async getGames() {
    let response = await axios.get(`/game/all`)
    console.log(response.data)

    this.setState({
      games: response.data,
    })
  }

  newGame() {
    axios
      .get(`/game/new`)
      .then(res => res.data)
      .then((data) => {
        if (!data.error) {
          window.location = `/game/${data.game.id}`
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteGame(id) {
    axios
      .post(`/game/delete`, {
        id
      })
      .then(res => res.data)
      .then((data) => {
        this.getGames()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return html`
      <h4 class="mb-3">All Games</h4>
      <button
        type="button"
        onClick=${() => this.newGame()}
        class="m-3 btn btn-primary"
      >
        Create New Game
      </button>
      <div class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Room id</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          ${this.state.games.map(
            (game, index) => html`
              <tbody>
                <tr>
                  <th scope="row">${game.id}</th>
                  <td>${game.status.event} at ${Date(game.timestamp)}</td>
                  <td><a class="btn btn-primary" href="/game/${game.id}">Join</a></td>
                  <td><button class="btn btn-danger" onClick=${() => this.deleteGame(game.id)}>Delete</button></td>
                </tr>
              </tbody>
            `
          )}
        </table>
      </div>
    `
  }
}
render(html`<${App} />`, document.getElementById('games-table'))
