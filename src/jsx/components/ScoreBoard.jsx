import React from 'react';

// Board with all scores: cookies now, all cookies, cookies per second
class ScoreBoard extends React.Component {
  render() {
    return (
      <div className="scoreBoard">
        <h1>Now you have: {Math.floor(this.props.numberOfCookies)} cookies</h1>
        <p>You produce {this.props.producePerSec.toFixed(1)} cookies per second</p>
        <h3>You have already made {Math.floor(this.props.cookiesMade)} cookies</h3>
      </div>
    );
  }
}

export default ScoreBoard;
