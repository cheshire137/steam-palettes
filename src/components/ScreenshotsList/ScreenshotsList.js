import React, { Component, PropTypes } from 'react';
import s from './ScreenshotsList.scss';
import withStyles from '../../decorators/withStyles';
import ScreenshotListItem from '../ScreenshotListItem/ScreenshotListItem';

@withStyles(s)
class ScreenshotsList extends Component {
  static propTypes = {
    screenshots: PropTypes.array.isRequired,
    steamID: PropTypes.string,
    username: PropTypes.string,
    gameID: PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    let message = 'Choose a screenshot:';
    if (this.props.screenshots.length < 1) {
      message = 'This ';
      if (typeof this.props.username === 'undefined') {
        message += 'game';
      } else {
        message += 'user';
      }
      message += ' does not have any screenshots.';
    }
    const nextScreenshots = this.props.screenshots.slice(1);
    return (
      <ul className={s.screenshots}>
        <li>
          <h3 className={s.intro}>{message}</h3>
        </li>
        {this.props.screenshots.map((screenshot, i) => {
          const nextScreenshot = nextScreenshots[i];
          return (
            <ScreenshotListItem key={screenshot.url} {...screenshot}
              steamID={this.props.steamID}
              username={this.props.username}
              gameID={this.props.gameID}
              nextScreenshot={nextScreenshot}
            />
          );
        })}
      </ul>
    );
  }

}

export default ScreenshotsList;
