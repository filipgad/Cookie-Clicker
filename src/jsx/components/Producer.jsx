import React from 'react';

// Button with producer
class Producer extends React.Component {
  render() {

    // button content
    const producerBtnContent =  <div>
                                  <img src={"./dist/imagessrc/images/" + this.props.img} />
                                  <h1>{this.props.name}</h1>
                                  <ul>
                                    <li>Each {this.props.name} produces {this.props.producePerSec} cookies per second.</li>
                                    <li>For next you need: {this.props.toActiveBtn} cookies.</li>
                                  </ul>
                                  <span>{this.props.numberOfElements}</span>
                                </div>;

    return (
      this.props.numberOfCookies >= this.props.toActiveBtn
      ?
        <button className={`${this.props.name.toLowerCase()} storeBtn`} onClick={this.props.clickBtn}>{producerBtnContent}</button>
      :
        <button className={`${this.props.name.toLowerCase()} storeBtn`} disabled onClick={this.props.clickBtn}>{producerBtnContent}</button>
    );
  }
}

export default Producer;
