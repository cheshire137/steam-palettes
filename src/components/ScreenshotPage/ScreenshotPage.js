import React, { Component, PropTypes } from 'react';
import s from './ScreenshotPage.scss';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';
import Steam from '../../api/steam';
import Header from '../Header';
import Colors from '../../api/colors';
import Palette from '../Palette';
import FontAwesome from 'react-fontawesome';
import SteamApps from '../../stores/steamApps';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';

@withStyles(s)
class ScreenshotPage extends Component {
  static propTypes = {
    steamID: PropTypes.string,
    username: PropTypes.string,
    screenshotID: PropTypes.string.isRequired,
    gameID: PropTypes.number,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      screenshot: undefined,
      title: 'Screenshot ' + props.screenshotID,
      colors: undefined,
      loadingRandomScreenshot: false,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(this.state.title);
  }

  componentDidMount() {
    Steam.getScreenshot(this.props.screenshotID).
          then(this.onScreenshotLoaded.bind(this)).
          catch(this.onScreenshotLoadError.bind(this));
  }

  onScreenshotLoaded(screenshot) {
    this.setState({ screenshot }, () => {
      this.updateTitle();
    });
    Colors.getColors(screenshot.mediumUrl).
           then(this.onColorsLoaded.bind(this)).
           catch(this.onColorsLoadError.bind(this));
  }

  onScreenshotLoadError(response) {
    console.error('failed to load Steam screenshot', response);
  }

  onColorsLoaded(colors) {
    this.setState({ colors });
  }

  onColorsLoadError(response) {
    console.error('failed to load colors from image', response);
  }

  onRandomScreenshotLoaded(screenshot) {
    const path = '/screenshot/' + screenshot.id;
    Location.push({
      ...(parsePath(path)),
    });
  }

  onRandomScreenshotLoadError(error) {
    console.error('failed to load random screenshot', error);
    this.setState({ loadingRandomScreenshot: false });
  }

  updateTitle() {
    const description = this.state.screenshot.description;
    if (typeof description === 'string' && description.length > 0) {
      this.setState({ title: description });
    }
  }

  loadRandomScreenshot(event) {
    const button = event.target;
    button.blur();
    this.setState({ loadingRandomScreenshot: true });
    Steam.getRandomScreenshot().
          then(this.onRandomScreenshotLoaded.bind(this)).
          catch(this.onRandomScreenshotLoadError.bind(this));
  }

  render() {
    const alt = 'Screenshot ' + this.props.screenshotID;
    const isScreenshotLoaded = typeof this.state.screenshot === 'object';
    let date = '';
    if (isScreenshotLoaded && this.state.screenshot.date) {
      date = this.state.screenshot.date.toLocaleDateString();
    }
    let backUrl = undefined;
    let backIcon = undefined;
    let backTitle = undefined;
    if (typeof this.props.username === 'string') {
      backUrl = '/player/' + this.props.username + '/' + this.props.steamID;
      backIcon = 'user';
      backTitle = this.props.username;
    } else if (typeof this.props.gameID !== 'undefined') {
      backUrl = '/game/' + this.props.gameID;
      backIcon = 'steam';
      backTitle = SteamApps.getName(this.props.gameID);
    } else if (isScreenshotLoaded) {
      if (typeof this.state.screenshot.appid === 'number' &&
          typeof this.state.screenshot.gameName === 'string') {
        backUrl = '/game/' + this.state.screenshot.appid;
        backIcon = 'steam';
        backTitle = this.state.screenshot.gameName;
      }
    }
    const areColorsLoaded = typeof this.state.colors === 'object';
    return (
      <div className={s.container}>
        <div className={s.row}>
          <div className={s.left}>
            <Header title={this.state.title} previousUrl={backUrl}
              previousTitle={backTitle}
              previousIcon={backIcon}
            />
          </div>
          <div className={s.right}>
            <button type="button"
              className={s.screenshotNavButton}
              onClick={this.loadRandomScreenshot.bind(this)}
              disabled={this.state.loadingRandomScreenshot}
            >
              Random screenshot &rarr;
            </button>
            {this.state.loadingRandomScreenshot ? (
              <FontAwesome name="spinner" spin className={s.spinner} />
            ) : ''}
          </div>
        </div>
        {isScreenshotLoaded ? (
          <div className={s.details}>
            <div className={s.left}>
              <a href={this.state.screenshot.fullSizeUrl} target="_blank"
                className={s.screenshotLink}
              >
                <img src={this.state.screenshot.mediumUrl}
                  alt={alt}
                  className={s.screenshot}
                />
              </a>
              <a href={this.state.screenshot.url} target="_blank"
                className={s.detailsUrl}
              >
                <FontAwesome name="info"
                  className={cx(s.icon, s.detailsIcon)}
                />
                View details
              </a>
              <a href={this.state.screenshot.fullSizeUrl} target="_blank"
                className={s.fullSizeLink}
              >
                <FontAwesome name="search-plus"
                  className={cx(s.icon, s.fullSizeIcon)}
                />
                View full size
              </a>
              <a className={s.authorLink} href={this.state.screenshot.userUrl}
                target="_blank"
              >
                <FontAwesome name="steam"
                  className={cx(s.icon, s.profileIcon)}
                />
                {typeof this.props.username === 'string' ? (
                  <span>View {this.props.username}'s profile</span>
                ) : (
                  <span>View user profile</span>
                )}
              </a>
              <ul className={s.metadata}>
                <li>{date}</li>
                <li>
                  {this.state.screenshot.width} &times; {this.state.screenshot.height}
                </li>
                <li>{this.state.screenshot.fileSize}</li>
              </ul>
            </div>
            <div className={s.right}>
              {areColorsLoaded ? (
                <Palette colors={this.state.colors} />
              ) : (
                <p className={s.colorsMessage}>Loading colors...</p>
              )}
            </div>
          </div>
        ) : (
          <p className={s.message}>Loading screenshot...</p>
        )}
      </div>
    );
  }

}

export default ScreenshotPage;
