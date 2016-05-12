import React, { Component, PropTypes } from 'react';
import s from './ScreenshotPage.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';
import Header from '../Header';
import Colors from '../../api/colors';
import Palette from '../Palette';

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
      colors: undefined,
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

  updateTitle() {
    const description = this.state.screenshot.description;
    if (typeof description === 'string' && description.length > 0) {
      this.setState({ title: description });
    }
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
    const areColorsLoaded = typeof this.state.colors === 'object';
    return (
      <div className={s.container}>
        <Header title={this.state.title} previousUrl={backUrl}
          previousTitle={backTitle}
        />
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
                View details
              </a>
              <a href={this.state.screenshot.fullSizeUrl} target="_blank"
                className={s.fullSizeLink}
              >
                View full size
              </a>
              <a className={s.authorLink} href={this.state.screenshot.userUrl}
                target="_blank"
              >
                View {this.props.username}'s profile
              </a>
            </div>
            <div className={s.right}>
              {areColorsLoaded ? (
                <Palette {...this.state.colors} />
              ) : (
                <p className={s.colorsMessage}>Loading colors...</p>
              )}
              <h3 className={s.metadataTitle}>Metadata</h3>
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
