import React from 'react';

const display = {
  display: "block"
};

class CookieInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadSession() == null ? display : this.loadSession();
  }

  clickAgree = () => {
    this.setState({
      display: "none"
    }, () => {
      this.saveSession(this.state);
    });
  }

  // localStorage save
  saveSession = (state) => {
      localStorage.setItem('cookieInfo', JSON.stringify(state));
  }

  // localStorage load
  loadSession = () => {
      return JSON.parse(localStorage.getItem('cookieInfo'));
  }

  render() {
    return (
      <div className="cookieInfo" style={{display: `${this.state.display}`}}>
        <p>
            Korzystanie z witryny oznacza zgodę na wykorzystywanie plików cookie.
        </p>
        <button className="agreeBtn" onClick={this.clickAgree}>Ok, rozumiem</button>
      </div>
    );
  }
}

export default CookieInfo;
