import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client';
import { LOBBY, USER_JOINED, MESSAGE_SEND } from "../../config/events"
import axios from 'axios'

const html = htm.bind(h)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      messages: [],
    }
    this.socket = io()
  }

  componentDidMount() {
    this.getMessages()
    this.socket.on( USER_JOINED, this.userJoined )
    this.socket.on( MESSAGE_SEND, this.messageReceived )
  }

  async getMessages() {
    let response = await axios.get(`/chat/lobby`)
    this.setState({
      messages: response.data.messages
    });
  }

  userJoined (data){
    console.log(data) 
  }

  messageReceived (data) {
    console.log(data)
  }

  handleTextAreaChange(event) {
    this.setState({ text: event.target.value })
  }

  sendMessage() {
    axios.post(`/chat/lobby/new`, {
      text: this.state.text
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return html`
      <div class="container-fliud m-3">
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              ${this.state.messages.map(
                (message) => html`
                  <li class="list-group-item">
                    ${message.sender_id} said ${message.body}
                  </li>
                `
              )}
            </ul>
            <div class="form-group my-3">
              <label>Enter your message</label>
              <textarea
                value=${this.state.text}
                onChange=${(e) => this.handleTextAreaChange(e)}
                class="form-control"
                rows="2"
              ></textarea>
              <button
                type="button"
                onClick=${() => this.sendMessage()}
                class="m-3 btn btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

render(html`<${App} />`, document.getElementById('chat'))
