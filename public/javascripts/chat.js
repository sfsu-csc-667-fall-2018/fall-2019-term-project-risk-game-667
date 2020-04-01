import { h, Component, render } from './preact';
import htm from './htm';

const html = htm.bind(h);

class App extends Component {
  render() {
    return html`
      <div class="container-fliud m-3">
        <div class="card">
          <ul class="list-group">
            <li class="list-group-item">This chat is so empty!</li>
          </ul>
          <div class="form-group m-4">
            <label>Enter your message</label>
            <textarea class="form-control" rows="2"></textarea>
            <button type="button" class="m-3 btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    `;
  }
}

render(html`<${App} />`, document.getElementById('chat'));

const socket = new WebSocket('ws://localhost:5000');

socket.addEventListener('open', function (event) {
  console.log('Connection with server opened!');
});

socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
});

socket.addEventListener('close', function (event) {
  console.log('Connection with server closed!');
});