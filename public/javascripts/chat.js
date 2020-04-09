import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client';
import { USER_JOINED, NEW_MESSAGE } from "../../config/events"
import axios from 'axios'

const html = htm.bind(h)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      messages: [],
      warning: ''
    }
    this.socket = io()
    // this.messageReceived = this.messageReceived.bind(this)
  }

  componentDidMount() {
    this.getMessages()
    this.socket.on( USER_JOINED, this.userJoined )

    this.socket.on( NEW_MESSAGE,  (data) => {
      this.setState({
        messages: [...this.state.messages, data]
      }, () => {
        scrollMessages()
      })
    })
  }

  async getMessages() {
    let response = await axios.get(`/chat/lobby`)
    this.setState({
      messages: response.data.messages.reverse()
    }, () => scrollMessages());
  }

  userJoined (data){
    console.log(data) 
  }

  handleTextAreaChange(event) {
    this.setState({ text: event.target.value })
  }

  sendMessage() {
    if (this.state.text.length !== 0) {
      axios.post(`/chat/lobby/new`, {
        text: this.state.text
      })
      .then((response) => {
        // console.log(this.state)
        if(!response.data.error) {
          this.setState({
            text: ''
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      this.setState({ warning: 'Your message is too short!' })
      setTimeout(() => this.setState({ warning: ''}), 2000)
    }
  }

  render() {
    return html`
      <div class="container-fliud m-3">
        <div class="card">
          <div class="card-body">
            <ul class="list-group chat-messages">
              ${this.state.messages.map(
                (message) => html`
                  <li class="list-group-item">
                    ${message.senderId} said ${message.body}
                  </li>
                `
              )}
            </ul>
            <div class="form-group my-3">
              <label>Enter your message ${this.state.warning}</label>
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

// TODO cleanup with preact
function scrollMessages(id){
  var element = document.querySelector('.chat-messages');
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

render(html`<${App} />`, document.getElementById('chat'))
