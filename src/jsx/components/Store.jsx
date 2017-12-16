import React from 'react';
import Producer from './Producer.jsx';

// Shop with producers
class Store extends React.Component {

  render() {
    return (
      <div className="store">
        <Producer name="Cursor" img="004-pay-per-click.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickCursor} numberOfElements={this.props.numberOfCursors} toActiveBtn={this.props.toActiveCursor} producePerSec={this.props.cookiesCursor} />
        <Producer name="Grandma" img="005-old-woman.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickGrandma} numberOfElements={this.props.numberOfGrandmas} toActiveBtn={this.props.toActiveGrandma} producePerSec={this.props.cookiesGrandma} />
        <Producer name="Farm" img="003-sprout.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickFarm} numberOfElements={this.props.numberOfFarms} toActiveBtn={this.props.toActiveFarm} producePerSec={this.props.cookiesFarm} />
        <Producer name="Bakery" img="002-business.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickBakery} numberOfElements={this.props.numberOfBakeries} toActiveBtn={this.props.toActiveBakery} producePerSec={this.props.cookiesBakery} />
        <Producer name="Mine" img="001-transport.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickMine} numberOfElements={this.props.numberOfMines} toActiveBtn={this.props.toActiveMine} producePerSec={this.props.cookiesMine} />
      </div>
    );
  }
}

export default Store;
