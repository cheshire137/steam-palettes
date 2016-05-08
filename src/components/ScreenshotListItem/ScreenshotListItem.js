import React, { Component, PropTypes } from 'react';
import s from './ScreenshotListItem.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class ScreenshotListItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <li className={s.screenshot}>
        {this.props.url} / {this.props.title}
      </li>
    );
  }

}

export default ScreenshotListItem;
