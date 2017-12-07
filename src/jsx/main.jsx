import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

  class Cookie extends React.Component {
    render() {
      return <button className="cookie" onClick={this.props.onClick}>Cookie</button>;
    }
  }

  class Cursor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfElements: 0,
        cookiesToActiveBtn: 50
      }
    }

    clickCursor = () => {
      this.setState({
        numberOfElements: this.state.numberOfElements + 1,
        cookiesToActiveBtn: this.state.cookiesToActiveBtn * (this.state.numberOfElements*2)
      });
    }

    render() {

      return (
        this.props.score > this.state.cookiesToActiveBtn ?
          <button className="cursor storeBtn" onClick={this.clickCursor}>Cursor, you have: {this.state.numberOfElements} cursors</button>
        :
          <button className="cursor storeBtn" disabled onClick={this.clickCursor}>Cursor, you have: {this.state.numberOfElements} cursors</button>
      );
    }
  }

  class Store extends React.Component {
    render() {
      return (
        <Cursor score={this.props.score} />
      );
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
          <Store score={this.state.score}/>
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
