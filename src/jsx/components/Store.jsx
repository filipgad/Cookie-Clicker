import React from 'react';
import Producer from './Producer.jsx';

// Shop with producers
class Store extends React.Component {

  render() {
    return (
      <div className="store">
        {
          this.props.producers.map( producer => {
              return <Producer key={producer.name} clickBtn={this.props.clickProducer} producer={producer} numberOfCookies={this.props.numberOfCookies} />
          })
        }
      </div>
    );
  }
}

export default Store;
