import React, { Component, PropTypes } from 'react';
import s from './ScreenshotsList.scss';
import withStyles from '../../decorators/withStyles';
import ScreenshotListItem from '../ScreenshotListItem/ScreenshotListItem';

@withStyles(s)
class ScreenshotsList extends Component {
  static propTypes = {
    screenshots: PropTypes.array.isRequired,
    steamID: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    let message = 'Choose a screenshot:';
    if (this.props.screenshots.length < 1) {
      message = 'This user does not have any screenshots.';
    }
    return (
      <ul className={s.screenshots}>
        <li className={s.intro}>
          {message}
        </li>
        {this.props.screenshots.map((screenshot) => {
          return (
            <ScreenshotListItem key={screenshot.url} {...screenshot}
              steamID={this.props.steamID}
              username={this.props.username}
            />
          );
        })}
      </ul>
    );
  }

}

export default ScreenshotsList;