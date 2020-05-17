import { h, Component, render } from '../vendor/preact'
import htm from '../vendor/htm'
import io from 'socket.io-client'
import { messageEvent } from '../../config/events'
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
      messages: [],
      warning: '',
    }
    this.socket = io()
    this.chatId = getRoom()
  }

  componentDidMount() {
    this.getMessages()
    this.textArea = document.querySelector('#text-area')

    this.socket.on(messageEvent(this.chatId), (data) => {
      this.setState(
        {
          messages: [...this.state.messages, data],
        },
        () => {
          scrollMessages()
        }
      )
    })
  }

  async getMessages() {
    let response = await axios.get(`/chat/${this.chatId}`)
    this.setState(
      {
        messages: response.data.messages.reverse(),
      },
      () => scrollMessages()
    )
  }

  userJoined(data) {
    console.log(data)
  }

  handleTextAreaChange(event) {
    this.setState({ text: event.target.value })
  }
  handleKeypress(event) {
    if (event.charCode === 13) {
      this.sendMessage(event.target.value)
      event.preventDefault()
    }
  }
  sendMessage(message) {
    if (message.length !== 0) {
      axios
        .post(`/chat/${this.chatId}/new`, {
          text: message,
        })
        .then((response) => {
          if (!response.data.error) {
            this.textArea.value = ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      this.setState({ warning: 'Your message is too short!' })
      setTimeout(() => this.setState({ warning: '' }), 2000)
    }
  }

  render() {
    return html`
      <div class="container-fliud m-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Chat</h5>
            <ul class="list-group chat-messages">
              ${this.state.messages.map(
                (message) => html`
                  <li class="list-group-item">
                    ${message.sender.username} said ${message.body}
                  </li>
                `
              )}
            </ul>
            <div class="form-group my-3">
              <label>Enter your message ${this.state.warning}</label>
              <textarea
                id="text-area"
                onKeyPress=${(e) => this.handleKeypress(e)}
                value=${this.state.text}
                class="form-control"
                rows="2"
              ></textarea>
              <button
                type="button"
                onClick=${() => this.sendMessage(this.textArea.value)}
                class="m-3 btn btn-primary btn-lg"
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
function scrollMessages(id) {
  var element = document.querySelector('.chat-messages')
  element.scrollTop = element.scrollHeight - element.clientHeight
}

render(html`<${App} />`, document.getElementById('chat'))
