import React, { Component, PropTypes } from 'react';
import s from './ScreenshotsList.scss';
import withStyles from '../../decorators/withStyles';
import ScreenshotListItem from '../ScreenshotListItem/ScreenshotListItem';

@withStyles(s)
class ScreenshotsList extends Component {
  static propTypes = {
    screenshots: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ul className={s.screenshots}>
        {this.props.screenshots.map((screenshot) => {
          return (
            <ScreenshotListItem key={screenshot.url} {...screenshot} />
          );
        })}
      </ul>
    );
  }

}

export default ScreenshotsList;
