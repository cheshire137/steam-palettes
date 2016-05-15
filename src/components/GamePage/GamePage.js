import React, { Component, PropTypes } from 'react';
import s from './GamePage.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';
import ScreenshotsList from '../ScreenshotsList/ScreenshotsList';
import Header from '../Header';
import SteamApps from '../../stores/steamApps';

@withStyles(s)
class GamePage extends Component {
  static propTypes = {
    gameID: PropTypes.number.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const title = SteamApps.getName(props.gameID);
    this.state = {
      popularScreenshots: undefined,
      recentScreenshots: undefined,
      title,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(this.state.title + ' Screenshots - Steam Palettes');
  }

  componentDidMount() {
    Steam.getScreenshots(this.props.gameID, true).
          then(this.onPopularScreenshotsLoaded.bind(this)).
          catch(this.onScreenshotsLoadError.bind(this));
    Steam.getScreenshots(this.props.gameID, false).
          then(this.onRecentScreenshotsLoaded.bind(this)).
          catch(this.onScreenshotsLoadError.bind(this));
  }

  onPopularScreenshotsLoaded(popularScreenshots) {
    this.setState({ popularScreenshots });
  }

  onRecentScreenshotsLoaded(recentScreenshots) {
    this.setState({ recentScreenshots });
  }

  onScreenshotsLoadError(response) {
    console.error('failed to load Steam screenshots', response);
  }

  render() {
    const recentScreenshotsLoaded =
        typeof this.state.recentScreenshots === 'object';
    const popularScreenshotsLoaded =
        typeof this.state.popularScreenshots === 'object';
    return (
      <div className={s.container}>
        <Header title={this.state.title} titleIcon="steam" />
        <div className={s.row}>
          <div className={s.left}>
            <h2 className={s.header}>Recent Screenshots</h2>
            {recentScreenshotsLoaded ? (
              <ScreenshotsList screenshots={this.state.recentScreenshots}
                gameID={this.props.gameID}
              />
            ) : (
              <p className={s.message}>
                Loading screenshots...
              </p>
            )}
          </div>
          <div className={s.right}>
            <h2 className={s.header}>Popular Screenshots</h2>
            {popularScreenshotsLoaded ? (
              <ScreenshotsList screenshots={this.state.popularScreenshots}
                gameID={this.props.gameID}
              />
            ) : (
              <p className={s.message}>
                Loading screenshots...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

}

export default GamePage;
