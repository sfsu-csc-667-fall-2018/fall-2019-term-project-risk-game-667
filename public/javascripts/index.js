import { h, Component, render } from './vendor/preact'
import htm from './vendor/htm'

const html = htm.bind(h)

class App extends Component {
  render() {
    return html`
      <div class="container-fliud m-3">
        <h3 class="display-4">Welcome to Risk Game!</h3>
        <a href="/">Back to lobby</a>
      </div>
    `
  }
}

render(html`<${App} />`, document.getElementById('app'))
