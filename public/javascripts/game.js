import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client'
import { emitGameEvent } from '../../config/events'

const html = htm.bind(h)

const getRoom = () => {
  let url = window.location.pathname.split('/') 
  return  url[url.length-1]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      warning: '',
    }
    this.socket = io()
    this.gameId = getRoom()
  }
  componentDidMount() {
    this.socket.on(emitGameEvent(this.gameId), (data) => {
      console.log('starting timer')
      this.handleTimerEvent()
    })
  }
  handleTimerEvent() {
    var countDownDate = new Date().getTime()+30000;
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      document.getElementById("timer").innerHTML = parseInt((countDownDate - now)/1000) + 's';
      console.log()
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
  render() {
    return html`
    <div style="text-align:left;">
      <div class="container-fliud m-3">
        <h3 class="display-4">Welcome to Risk Game!
        <p style="float:right;" id="timer" >
      </p></h3>
        <a href="/lobby">Back to lobby</a>
      </div>
      
    </div>
    `
  }
}

render(html`<${App} />`, document.getElementById('app'))
