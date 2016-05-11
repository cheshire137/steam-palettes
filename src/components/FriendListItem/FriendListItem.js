import React, { Component, PropTypes } from 'react';
import s from './FriendListItem.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class FriendListItem extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    avatarfull: PropTypes.string,
    avatarmedium: PropTypes.string.isRequired,
    lastlogoff: PropTypes.number,
    loccityid: PropTypes.number,
    loccountrycode: PropTypes.string,
    locstatecode: PropTypes.string,
    personaname: PropTypes.string,
    personastate: PropTypes.number,
    personastateflags: PropTypes.number,
    primaryclanid: PropTypes.string,
    profilestate: PropTypes.number,
    profileurl: PropTypes.string.isRequired,
    realname: PropTypes.string,
    steamid: PropTypes.string.isRequired,
    timecreated: PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const url = '/player/' + this.props.personaname + '/' + this.props.steamid;
    return (
      <li className={s.friend}>
        <a href={url} className={s.link} onClick={Link.handleClick}>
          <img src={this.props.avatar} className={s.avatar}
            alt={this.props.steamid}
          />
          <span className={s.name}>{this.props.personaname}</span>
        </a>
      </li>
    );
  }

}

export default FriendListItem;
