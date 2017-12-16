import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';

document.addEventListener('DOMContentLoaded', function() {

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
