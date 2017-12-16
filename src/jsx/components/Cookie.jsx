import React from 'react';

// Cookie to click
class Cookie extends React.Component {
  render() {
    return <button className="cookie" onClick={this.props.onClick}></button>;
  }
}

export default Cookie;
