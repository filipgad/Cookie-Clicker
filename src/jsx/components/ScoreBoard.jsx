import React from 'react';

// Board with all scores: cookies now, all cookies, cookies per second
class ScoreBoard extends React.Component {
  render() {
    return (
      <div className="scoreBoard">
        <h1>Now you have: {this.props.numberOfCookies} cookies</h1>
        <p>You produce {this.props.producePerSec} cookies per second</p>
        <h3>You have already made {this.props.cookiesMade} cookies</h3>
      </div>
    );
  }
}

export default ScoreBoard;
