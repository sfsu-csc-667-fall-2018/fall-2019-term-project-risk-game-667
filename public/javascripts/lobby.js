import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import axios from 'axios'

const html = htm.bind(h)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    this.getGames()
  }

  async getGames() {
    let response = await axios.get(`/game/all`)
    console.log(response)
    this.setState({
      games: response.data
    })
  }

  newGame() {
    axios
      .get(`/game/new`)
      .then((response) => {
        if (!response.data.error) {
          this.getGames()
        }
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
              <th scope="col">Link</th>
            </tr>
          </thead>
          ${this.state.games.map(
            (game, index) => html`
              <tbody>
                <tr>
                  <th scope="row">${index}</th>
                  <td>${game.status}</td>
                  <td><a href="/game/${game.id}">Join</a></td>
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
