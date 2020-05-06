import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'

const html = htm.bind(h)


class App extends Component {
  handleTimerEvent() {
    var countDownDate = new Date().getTime()+30000;
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      document.getElementById("timer").innerHTML = parseInt((countDownDate - now)/1000) + 's';
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
        <p style="float:right;" id="timer" onload="${this.handleTimerEvent()}">
      </p></h3>
        <a href="/lobby">Back to lobby</a>
      </div>
      
    </div>
    `
  }
}

render(html`<${App} />`, document.getElementById('app'))
