import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

  // Cookie to click
  class Cookie extends React.Component {
    render() {
      return <button className="cookie" onClick={this.props.onClick}>Cookie</button>;
    }
  }

  // Button with producer
  class Producer extends React.Component {
    render() {

      return (
        this.props.score >= this.props.toActiveBtn ?
          <button className="{this.props.name} storeBtn" onClick={this.props.clickBtn}>{this.props.name}! You have: {this.props.numberOfElements} {this.props.name}s. For next you need: {this.props.toActiveBtn} {this.props.name}s.</button>
        :
          <button className="{this.props.name} storeBtn" disabled onClick={this.props.clickBtn}>{this.props.name}! You have: {this.props.numberOfElements} {this.props.name}s. For next you need: {this.props.toActiveBtn} {this.props.name}s.</button>
      );
    }
  }

  // Shop with producers
  class Store extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfCursors: 0, // each numberOf... stores the number of producers we have bought
        toActiveCursor: 5, // each toActive... stores the number of points we need to activate the producer
        numberOfGrandmas: 0,
        toActiveGrandma: 50,
        numberOfFarms:0,
        toActiveFarm: 100,
        numberOfBakeries: 0,
        toActiveBakery: 200,
        numberOfMines: 0,
        toActiveMain: 400,
        score: this.props.score
      }
    }


    clickCursor = () => {
      this.setState({
        numberOfCursors: this.state.numberOfCursors + 1,
        toActiveCursor: this.state.toActiveCursor * 2
      });
    }

    clickGrandma = () => {
      this.setState({
        numberOfGrandmas: this.state.numberOfGrandmas + 1,
        toActiveGrandma: this.state.toActiveGrandma * 2
      });
    }

    clickFarm = () => {
      this.setState({
        numberOfFarms: this.state.numberOfFarms + 1,
        toActiveFarm: this.state.toActiveFarm * 2
      });
    }

    clickBakery = () => {
      this.setState({
        numberOfBakeries: this.state.numberOfBakeries + 1,
        toActiveBakery: this.state.toActiveBakery * 2
      });
    }

    clickMain = () => {
      this.setState({
        numberOfMains: this.state.numberOfMains + 1,
        toActiveMain: this.state.toActiveMain * 2
      });
    }

    render() {
      return (
        <div>
          <Producer name="Cursor" score={this.props.score} clickBtn={this.clickCursor} numberOfElements={this.state.numberOfCursors} toActiveBtn={this.state.toActiveCursor}/>
          <Producer name="Grandma" score={this.props.score} clickBtn={this.clickGrandma} numberOfElements={this.state.numberOfGrandmas} toActiveBtn={this.state.toActiveGrandma}/>
          <Producer name="Farm" score={this.props.score} clickBtn={this.clickFarm} numberOfElements={this.state.numberOfFarms} toActiveBtn={this.state.toActiveFarm}/>
          <Producer name="Bakery" score={this.props.score} clickBtn={this.clickBakery} numberOfElements={this.state.numberOfBakeries} toActiveBtn={this.state.toActiveBakery}/>
          <Producer name="Main" score={this.props.score} clickBtn={this.clickMain} numberOfElements={this.state.numberOfMains} toActiveBtn={this.state.toActiveMain}/>
        </div>
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
