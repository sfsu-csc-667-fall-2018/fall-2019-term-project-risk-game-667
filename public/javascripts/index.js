import { h, Component, render } from './preact';
import htm from './htm';

const html = htm.bind(h);

class App extends Component {
  componentDidMount() {
    this.getQuotes()
  }

  getQuotes() {
    return fetch('/api/quotes')
      .then((response) => response.json())
      .then((responseJson) => {
        const { quotes = [] } = this.state;
        this.setState({ quotes: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render({}, { quotes = [] }) {
    return html`
      <div class="app">
        <${Navbar} title="Quotes by Kanye"/>
        <div class="jumbotron mt-5">
          <div class="container text-center text-dark">
            <img src="https://i.ya-webdesign.com/images/transparent-face-png-8.png" class="kanye img-fluid"  width="200"/>
            <h3 class="display-5 mt-3">Kanye says...</h3>
          </div>
        </div>
        <div class="container">
          <div class="row">
            ${quotes.map((quote, index) => html`
              <div class="col-md-6">
                <h2>${'Quote ' + (index+1)}</h2>
                <p>${quote.text} </p>
              </div>  
            `)}
          </div>
        </div>
        <${Footer}/>
      </div>
    `;
  }
}

const Navbar = ({ title }) => html`
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top ">
  <a class="navbar-brand" href="/">${title}</a>
</nav>
`

const Footer = () => html`
<footer class="bg-dark footer mt-auto py-3">
  <div class="container">
    <span>${(new Date).getFullYear()} Build with Webpack, Preact and Bootstrap</span>
  </div>
</footer>
`

render(html`<${App} />`, document.getElementById('app'));