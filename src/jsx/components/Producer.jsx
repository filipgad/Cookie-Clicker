import React from 'react';
import { updateProducerData, getProducerData } from '../indexedDB.js';

// Button with producer
class Producer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      production: this.props.producer.quantity,
      cost: this.props.producer.cost,
      quantity: this.props.producer.quantity
    }
  }

  componentDidUpdate() {
    // after every update save new state value
    updateProducerData(this.props.producer.name, [this.state.production, this.state.cost, this.state.quantity])
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {
        production: prevState.production + this.props.producer.productionPerSec,
        cost: Math.ceil(prevState.cost * 1.15),
        quantity: prevState.quantity + 1
      }
    });
    this.props.clickBtn(this.state.cost, this.props.producer.productionPerSec);
  }

  render() {

    // button content
    const producerBtnContent =  <div>
                                  <img src={"./dist/imagessrc/images/" + this.props.producer.name + ".png"} />
                                  <h1>{this.props.producer.name}</h1>
                                  <ul>
                                    <li>Production: {this.props.producer.name == "Cursor" ? this.state.production.toFixed(1) : this.state.production} cookies/sec.</li>
                                    <li>For next you need: {this.state.cost} cookies.</li>
                                  </ul>
                                  <span>{this.state.quantity}</span>
                                </div>;

    return (
      this.props.numberOfCookies >= this.state.cost
      ?
        <button className={`${this.props.producer.name.toLowerCase()} storeBtn`} onClick={this.handleClick}>{producerBtnContent}</button>
      :
        <button className={`${this.props.producer.name.toLowerCase()} storeBtn`} disabled onClick={this.handleClick}>{producerBtnContent}</button>
    );
  }
}

export default Producer;
