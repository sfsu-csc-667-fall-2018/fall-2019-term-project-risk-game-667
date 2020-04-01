import { h, Component, render } from './preact';
import htm from './htm';
import ReconnectingWebSocket from './ws';

const html = htm.bind(h);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: '',
      messages: []
    };
    this.socket = new ReconnectingWebSocket(location.origin.replace(/^http/, 'ws'));
  }

  componentDidMount() {
    this.socket.onopen = event => {
      console.log('Connection with chat server opened!');
    }

    this.socket.onmessage = event => {
      let messages = JSON.parse(event.data);
      // console.log(messages) //TODO remove debugging
      this.setState({ messages: messages });
    };
  
    this.socket.onclose = event => {
      console.log('Connection with chat server closed!');
    };
  }


  sendMessage() {
    let data = JSON.stringify({
      body: this.state.textAreaValue,
      senderId: 'guest',
      chatId: 'lobby'
    });
    this.socket.send(data);
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
              <li class="list-group-item">${message.sender_id} said ${message.body}</li>
            `)}
            </ul>
            <div class="form-group my-3">
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

