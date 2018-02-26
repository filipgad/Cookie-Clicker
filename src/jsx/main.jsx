import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import "./indexedDB.js";

document.addEventListener('DOMContentLoaded', function() {

  class App extends React.Component {
    render() {
      return (
        <div>
          <Game />
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
