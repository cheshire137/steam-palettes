import React, { Component, PropTypes } from 'react';
import s from './FriendsList.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';
import FriendListItem from '../FriendListItem/FriendListItem';

@withStyles(s)
class FriendsList extends Component {
  static propTypes = {
    steamID: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { friends: undefined, message: undefined };
  }

  componentDidMount() {
    Steam.getFriends(this.props.steamID).
          then(this.onFriendsLoaded.bind(this)).
          catch(this.onFriendsLoadError.bind(this));
  }

  onFriendsLoaded(friends) {
    this.setState({ friends });
  }

  onFriendsLoadError(error) {
    console.error('failed to load friends list', error);
    this.setState({ message: error.message });
  }

  render() {
    const friendsLoaded = typeof this.state.friends === 'object';
    let publicFriends = [];
    if (friendsLoaded) {
      publicFriends = this.state.friends.filter((friend) => {
        return friend.communityvisibilitystate === 3;
      });
    }
    return (
      <div className={s.container}>
        {friendsLoaded ? (
          <ul className={s.friends}>
            <li className={s.header}>Friends</li>
            {publicFriends.map((friend) => {
              const key = this.props.steamID + '-' + friend.steamid;
              return (
                <FriendListItem key={key} {...friend} />
              );
            })}
          </ul>
        ) : (
          <div>
            {typeof this.state.message === 'string' ? (
              <p className={s.error}>{this.state.message}</p>
            ) : (
              <p className={s.message}>Loading friends...</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default FriendsList;
