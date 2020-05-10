import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client'
import { emitGameEvent } from '../../config/events'
import axios from 'axios'

const html = htm.bind(h)

const getRoom = () => {
  let url = window.location.pathname.split('/')
  return url[url.length - 1]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expireTime: 0,
    }
    this.expireTime = 0
    this.socket = io()
    this.gameId = getRoom()
  }
  componentDidMount() {
    // this.getGameState()
    // this.socket.on(emitGameEvent(this.gameId), (data) => {
    //   this.handleTimerEvent(parseInt(data))
    // })
  }
  async getGameState() {
    let response = await axios.get(`/game/${this.gameId}`)
  }
  handleTimerEvent(time) {
    var x = setInterval(function () {
      var now = new Date().getTime()
      var distance = time - now
      document.getElementById('timer').innerHTML =
        parseInt(distance / 1000) + 's'
      console.log()
      if (distance < 0) {
        clearInterval(x)
        document.getElementById('timer').innerHTML = 'EXPIRED'
      }
    }, 1000)
  }
  render() {
    return html`
      <div style="text-align:left;">
        <div class="container-fliud m-3">
          <h3 class="display-4">
            Welcome to Risk Game!
            <p style="float:right;" id="timer">Waiting for player..</p>
          </h3>
          <a href="/lobby">Back to lobby</a>
        </div>
      </div>
    `
  }
}

render(html`<${App} />`, document.getElementById('app'))
