import React, { Component, PropTypes } from 'react';
import s from './PlayerPage.scss';
import withStyles from '../../decorators/withStyles';
import PlayerSummary from '../PlayerSummary/PlayerSummary';

const title = 'Steam User';

@withStyles(s)
class PlayerPage extends Component {
  static propTypes = {
    steamID: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.container}>
        <PlayerSummary key={this.props.steamID}
          steamID={this.props.steamID}
        />
      </div>
    );
  }

}

export default PlayerPage;
