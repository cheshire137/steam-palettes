import React, { Component, PropTypes } from 'react';
import s from './PlayerPage.scss';
import withStyles from '../../decorators/withStyles';
import PlayerSummary from '../PlayerSummary/PlayerSummary';
import FriendsList from '../FriendsList/FriendsList';
import Steam from '../../api/steam';
import ScreenshotsList from '../ScreenshotsList/ScreenshotsList';
import Header from '../Header';

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
    this.state = { screenshots: undefined, title: props.username };
  }

  componentWillMount() {
    this.context.onSetTitle(this.state.title);
  }

  componentDidMount() {
    Steam.getScreenshots(this.props.username).
          then(this.onScreenshotsLoaded.bind(this, this.props.username)).
          catch(this.onScreenshotsLoadError.bind(this));
  }

  onScreenshotsLoaded(username, screenshots) {
    this.setState({ screenshots, screenshotsUsername: username });
  }

  onScreenshotsLoadError(response) {
    console.error('failed to load Steam screenshots', response);
  }

  render() {
    const screenshotsKey = 'screenshots-' + this.props.username;
    const friendsKey = 'friends-' + this.props.steamID;
    const screenshotsLoaded =
        this.state.screenshotsUsername === this.props.username &&
        typeof this.state.screenshots === 'object';
    return (
      <div className={s.container}>
        <Header title={this.state.title} />
        <div className={s.row}>
          <div className={s.left}>
            <PlayerSummary key={this.props.steamID}
              steamID={this.props.steamID}
            />
            {screenshotsLoaded ? (
              <ScreenshotsList screenshots={this.state.screenshots}
                steamID={this.props.steamID}
                username={this.props.username}
                key={screenshotsKey}
              />
            ) : (
              <p className={s.message}>
                Loading screenshots...
              </p>
            )}
          </div>
          <div className={s.right}>
            <FriendsList steamID={this.props.steamID}
              key={friendsKey}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default PlayerPage;
