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
    this.state = { screenshots: undefined, title };
  }

  componentWillMount() {
    this.context.onSetTitle(this.state.title);
  }

  componentDidMount() {
    Steam.getScreenshots(this.props.gameID).
          then(this.onScreenshotsLoaded.bind(this)).
          catch(this.onScreenshotsLoadError.bind(this));
  }

  onScreenshotsLoaded(screenshots) {
    this.setState({ screenshots });
  }

  onScreenshotsLoadError(response) {
    console.error('failed to load Steam screenshots', response);
  }

  render() {
    const screenshotsLoaded = typeof this.state.screenshots === 'object';
    return (
      <div className={s.container}>
        <Header title={this.state.title} titleIcon="steam" />
        {screenshotsLoaded ? (
          <ScreenshotsList screenshots={this.state.screenshots}
            gameID={this.props.gameID}
          />
        ) : (
          <p className={s.message}>
            Loading screenshots...
          </p>
        )}
      </div>
    );
  }

}

export default GamePage;
