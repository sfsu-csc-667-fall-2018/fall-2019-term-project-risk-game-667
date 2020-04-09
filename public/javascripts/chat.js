import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client';
import { LOBBY, USER_JOINED, MESSAGE_SEND } from "../../config/events"

const html = htm.bind(h)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textAreaValue: '',
      messages: [],
    }
    this.socket = io()
  }

  componentDidMount() {
    this.socket.on( USER_JOINED, this.userJoined )
    this.socket.on( MESSAGE_SEND, this.messageReceived )
  }

  userJoined (data){
    console.log(data) 
  }

  messageReceived (data) {
    console.log(data)
  }

  handleTextAreaChange(event) {
    this.setState({ textAreaValue: event.target.value })
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
                value=${this.state.textAreaValue}
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
