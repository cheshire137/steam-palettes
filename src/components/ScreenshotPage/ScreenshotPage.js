import React, { Component, PropTypes } from 'react';
import s from './ScreenshotPage.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';
import Link from '../Link';
import Header from '../Header';

@withStyles(s)
class ScreenshotPage extends Component {
  static propTypes = {
    steamID: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    screenshotID: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      screenshot: undefined,
      title: 'Screenshot ' + props.screenshotID,
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
    const newState = { screenshot };
    if (typeof screenshot.description === 'string' && screenshot.description.length > 0) {
      newState.title = screenshot.description;
    }
    this.setState(newState);
  }

  onScreenshotLoadError(response) {
    console.error('failed to load Steam screenshot', response);
  }

  render() {
    const alt = 'Screenshot ' + this.props.screenshotID;
    const isScreenshotLoaded = typeof this.state.screenshot === 'object';
    let date = '';
    if (isScreenshotLoaded && this.state.screenshot.date) {
      date = this.state.screenshot.date.toLocaleDateString();
    }
    const backTitle = this.props.username;
    const backUrl = '/player/' + this.props.username + '/' + this.props.steamID;
    return (
      <div className={s.container}>
        <Header title={this.state.title} previousUrl={backUrl}
          previousTitle={backTitle}
        />
        {isScreenshotLoaded ? (
          <div className={s.details}>
            <a href={this.state.screenshot.fullSizeUrl} target="_blank"
              className={s.screenshotLink}
            >
              <img src={this.state.screenshot.mediumUrl}
                alt={alt}
                className={s.screenshot}
              />
            </a>
            <dl className={s.metadata}>
              <dt>Date</dt>
              <dd>{date}</dd>
              <dt>Dimensions</dt>
              <dd>
                {this.state.screenshot.width} &times; {this.state.screenshot.height}
              </dd>
              <dt>File Size</dt>
              <dd>{this.state.screenshot.fileSize}</dd>
            </dl>
            <a className={s.authorLink} href={this.state.screenshot.userUrl}
              target="_blank"
            >
              View {this.props.username}'s profile
            </a>
          </div>
        ) : (
          <p className={s.message}>Loading screenshot...</p>
        )}
      </div>
    );
  }

}

export default ScreenshotPage;
