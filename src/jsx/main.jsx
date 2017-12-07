import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

  class Cookie extends React.Component {
    render() {
      return <button className="cookie" onClick={this.props.onClick}>Cookie</button>;
    }
  }

  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        score: 0
      }
    }

    handleClick = () => {
      this.setState({
        score: this.state.score + 1
      });
    }

    render() {
      return (
        <div>
          <Cookie onClick={this.handleClick} />
          <h1>{this.state.score}</h1>
        </div>
      );
    }
  }

  class App extends React.Component {
    render() {
      return (
        <Game />
      );
    }
  }


    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
});
