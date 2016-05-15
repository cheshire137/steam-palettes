import React, { Component, PropTypes } from 'react';
import s from './ScreenshotListItem.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class ScreenshotListItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    steamID: PropTypes.string,
    username: PropTypes.string,
    gameID: PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getIDFromUrl() {
    const prefix = 'id=';
    const index = this.props.url.indexOf(prefix);
    return this.props.url.slice(index + prefix.length);
  }

  render() {
    const id = this.getIDFromUrl();
    let url = '';
    if (typeof this.props.username === 'string') {
      url = '/player/' + this.props.username + '/' + this.props.steamID +
             '/' + id;
    } else {
      url = '/game/' + this.props.gameID + '/' + id;
    }
    return (
      <li className={s.screenshot}>
        <a href={url} onClick={Link.handleClick}>
          {typeof this.props.title === 'string' ? (
            <span className={s.title}>
              &ldquo;{this.props.title}&rdquo;
            </span>
          ) : (
            <span>
              Untitled {id}
            </span>
          )}
        </a>
      </li>
    );
  }

}

export default ScreenshotListItem;
