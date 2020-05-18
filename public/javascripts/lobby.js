import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import axios from 'axios'
import io from 'socket.io-client'
import { lobbyEvent } from '../../config/events'
import { PHASE } from '../../config/const'

const html = htm.bind(h)

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)
const crop = word => `${word.slice(0,5)}...${word.slice(59,63)}`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      games: [],
      filter: 'all'
    }
    this.socket = io()
    this.filters = {
      'all': (game) => game,
      'started': (game) => game.player_two !== 'null',
      'hosted': (game) => game.player_one === this.state.id,
      'partaken': (game) => this.filters.hosted(game) || game.player_two === this.state.id,
    }
    this.canJoin = game => !this.filters.started(game) || this.filters.partaken(game)
  }

  componentDidMount() {
    this.getGames()

    this.socket.on(lobbyEvent(), (data) => {
      this.getGames()
    })
  }

  async getGames() {
    let response = await axios.get(`/game/all`)
    this.setState({
      games: response.data.games,
      id: response.data.id
    })
  }

  newGame() {
    axios
      .get(`/game/new`)
      .then((res) => res.data)
      .then((data) => {
        if (!data.error) {
          window.location = `/game/${data.id}`
        }
      })
      .catch((error) => {})
  }

  deleteGame(id) {
    axios
      .post(`/game/delete`, {
        id,
      })
      .then((res) => res.data)
      .then((data) => {
        this.getGames()
      })
      .catch((error) => {})
  }

  render() {
    return html`
      <div class="card">
        <div class="card-body">
          <h4 class="mb-3">All Games</h4>
          <div class="btn-group" style="width: 100%;" role="group" aria-label="Basic example">
            <button
              type="button"
              onClick=${() => this.newGame()}
              class="m-3 btn btn-primary btn-lg"
              style="border-top-right-radius: .3rem; border-bottom-right-radius: .3rem;"
            >
              Create New Game
            </button>
            <div class="dropdown">
              <button class="m-3 btn btn-outline-primary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter: ${capitalize(this.state.filter)}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a 
                  class="dropdown-item" 
                  onClick=${() => this.setState({ filter: 'all' })} 
                >
                    All
                </a>
                <a 
                  class="dropdown-item" 
                  onClick=${() => this.setState({ filter: 'started' })} 
                >
                    Started
                </a>
                <a 
                  class="dropdown-item" 
                  onClick=${() => this.setState({ filter: 'hosted' })} 
                >
                    Hosted
                </a>
              </div>
            </div>
          </div>
          <div class="table-responsive-md">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Game Id</th>
                  <th scope="col">Host</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              ${this.state.games.filter(this.filters[this.state.filter]).map(
                (game, index) => html`
                  <tbody>
                    <tr>
                      <th scope="row">${crop(game.id)}</th>
                      <th scope="row">${game.host}</th>
                      <td>
                        <a
                          class="btn ${this.canJoin(game) ? '' : 'disabled'} btn-primary btn-lg"
                          href="/game/${game.id}"
                          style="width: 100%;"
                          >
                            ${this.filters.partaken(game) 
                              ? 'Continue' 
                              : (this.canJoin(game)
                                  ? 'Join'
                                  : 'GAME STARTED')}
                          </a
                        >
                      </td>
                    </tr>
                  </tbody>
                `
              )}
            </table>
          </div>
        </div>
      </div>
    `
  }
}
render(html`<${App} />`, document.getElementById('games-table'))
