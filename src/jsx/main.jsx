import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import CookieInfo from './components/CookieInfo.jsx';

document.addEventListener('DOMContentLoaded', function() {

  class App extends React.Component {
    render() {
      return (
        <div>
          <CookieInfo />
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
