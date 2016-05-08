import React, { Component, PropTypes } from 'react';
import s from './PlayerSummary.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';

@withStyles(s)
class PlayerSummary extends Component {
  static propTypes = {
    steamID: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { player: undefined };
  }

  componentDidMount() {
    Steam.getPlayerSummary(this.props.steamID).
          then(this.onPlayerSummaryLoaded.bind(this)).
          catch(this.onPlayerSummaryLoadError.bind(this));
  }

  onPlayerSummaryLoaded(player) {
    this.setState({ player });
  }

  onPlayerSummaryLoadError(response) {
    console.error('failed to load player summary', response);
  }

  prettyTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString();
  }

  render() {
    return (
      <div className={s.container}>
        {typeof this.state.player === 'undefined' ? (
          <p className={s.message}>
            Loading Steam profile...
          </p>
        ) : (
          <div className={s.card}>
            <div className={s.avatarContainer}>
              <a href={this.state.player.profileurl} target="_blank">
                <img src={this.state.player.avatarmedium}
                  alt={this.state.player.personaname}
                  className={s.avatar}
                />
              </a>
            </div>
            <div className={s.main}>
              <h3 className={s.name}>
                {typeof this.state.player.realname === 'string' ? (
                  <span>
                    <span className={s.realName}>
                      {this.state.player.realname}
                    </span>
                    <span className={s.screenName}>
                      {this.state.player.personaname}
                    </span>
                  </span>
                ) : (
                  <span>{this.state.player.personaname}</span>
                )}
              </h3>
              <a className={s.profileLink} href={this.state.player.profileurl}
                target="_blank"
              >
                View profile
              </a>
              {typeof this.state.player.timecreated === 'number' ? (
                <span className={s.createdWrapper}>
                  Member since
                  <time className={s.created}>
                    {this.prettyTime(this.state.player.timecreated)}
                  </time>
                </span>
              ) : ''}
              {typeof this.state.player.lastlogoff === 'number' ? (
                <span className={s.logoffWrapper}>
                  Last logoff
                  <time className={s.logoff}>
                    {this.prettyTime(this.state.player.lastlogoff)}
                  </time>
                </span>
              ) : ''}
            </div>
          </div>
        )}
      </div>
    );
  }

}

export default PlayerSummary;
