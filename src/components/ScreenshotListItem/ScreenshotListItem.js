import React, { Component, PropTypes } from 'react';
import s from './ScreenshotListItem.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class ScreenshotListItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    id: PropTypes.string,
    steamID: PropTypes.string,
    username: PropTypes.string,
    gameID: PropTypes.number,
    nextScreenshotIDs: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    let url = '';
    if (typeof this.props.username === 'string') {
      url = '/player/' + this.props.username + '/' + this.props.steamID +
             '/' + this.props.id;
    } else {
      url = '/game/' + this.props.gameID + '/' + this.props.id;
    }
    if (typeof this.props.nextScreenshotIDs === 'string' &&
        this.props.nextScreenshotIDs.length > 0) {
      url += '?next=' + this.props.nextScreenshotIDs;
    }
    return (
      <li className={s.screenshot}>
        <a href={url} onClick={Link.handleClick}>
          {typeof this.props.title === 'string' ? (
            <span className={s.title}>
              {this.props.title.indexOf('Screenshot by ') === 0 ? (
                <span>{this.props.title}</span>
              ) : (
                <span>&ldquo;{this.props.title}&rdquo;</span>
              )}
            </span>
          ) : (
            <span>
              Untitled {this.props.id}
            </span>
          )}
        </a>
      </li>
    );
  }

}

export default ScreenshotListItem;
