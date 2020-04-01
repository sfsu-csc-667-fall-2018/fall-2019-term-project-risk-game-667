import { h, Component, render } from './preact';
import htm from './htm';

const html = htm.bind(h);

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: '',
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:5000');

    this.socket.addEventListener('open', function (event) {
      console.log('Connection with server opened!');
    });
    this.socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
  
    this.socket.addEventListener('close', function (event) {
      console.log('Connection with server closed!');
    });
  
  }

  componentDidMount() {
    this.loadTestMessages();
  }

  loadTestMessages() {
    this.setState({
      messages: [
        { sender: 'artem', body: 'Hello Chat' },
        { sender: 'artem', body:'I like htm and preact' },
        { sender: 'artem', body:`I don't like hamburgers, and designing ui` },
      ]
    });
  }

  sendMessage() {
    this.socket.send({ body: this.state.textAreaValue });
    this.setState({ textAreaValue: '' });
  }

  handleTextAreaChange(event) {
    this.setState({ textAreaValue: event.target.value});
  }

  render() {
    return html`
      <div class="container-fliud m-3">
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
            ${this.state.messages.map((message) => html`
              <li class="list-group-item">${message.sender} said ${message.body}</li>
            `)}
            </ul>
            <div class="form-group m-4">
              <label>Enter your message</label>
              <textarea value=${this.state.textAreaValue} onChange=${(e) => this.handleTextAreaChange(e)} class="form-control" rows="2"></textarea>
              <button type="button" onClick=${() => this.sendMessage()} class="m-3 btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

render(html`<${App} />`, document.getElementById('chat'));

