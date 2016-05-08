import React, { Component, PropTypes } from 'react';
import s from './PlayerPage.scss';
import withStyles from '../../decorators/withStyles';
import PlayerSummary from '../PlayerSummary/PlayerSummary';
import Steam from '../../api/steam';

const title = 'Steam User';

@withStyles(s)
class PlayerPage extends Component {
  static propTypes = {
    steamID: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
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

  componentDidMount() {
    Steam.getScreenshots(this.props.username).
          then(this.onScreenshotsLoaded.bind(this)).
          catch(this.onScreenshotsLoadError.bind(this));
  }

  onScreenshotsLoaded(data) {
    console.log('screenshots', data);
  }

  onScreenshotsLoadError(response) {
    console.error('failed to load Steam screenshots', response);
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
