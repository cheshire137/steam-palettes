import React, { Component } from 'react';
import s from './GameSearchForm.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Steam from '../../api/steam';

@withStyles(s)
class GameSearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: undefined,
      games: [],
      searchMade: false,
    };
  }

  onSteamGamesLoaded(games) {
    this.setState({ games, searchMade: true });
  }

  onSteamGamesLoadError(response) {
    console.error('failed to load Steam games', response);
    this.setState({
      message: 'There was an error searching for Steam games. :(',
      searchMade: true,
    });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value }, this.search.bind(this));
  }

  search() {
    this.setState({ searchMade: false });
    if (this.state.name.length > 3) {
      Steam.getGames(this.state.name).
            then(this.onSteamGamesLoaded.bind(this)).
            catch(this.onSteamGamesLoadError.bind(this));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit.bind(this)}>
        <label className={s.label}
          htmlFor="game-name"
        >Steam game:</label>
        <input type="text" autoFocus="autofocus" className={s.textField}
          id="game-name"
          placeholder="e.g., Skyrim"
          onChange={this.onNameChange.bind(this)}
          value={this.state.name}
          disabled={this.state.disabled}
        />
        {typeof this.state.message === 'string' ? (
          <p className={s.message}>
            {this.state.message}
          </p>
        ) : ''}
        {this.state.games.length > 0 ? (
          <ul className={s.gamesList}>
            {this.state.games.map((game) => {
              const url = '/game/' + game.appid;
              return (
                <li key={game.appid} className={s.gameListItem}>
                  <a href={url} className={s.gameLink}
                    onClick={Link.handleClick}
                  >
                    {game.name}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            {this.state.searchMade ? (
              <p className={s.message}>
                No games match
              </p>
            ) : ''}
          </div>
        )}
      </form>
    );
  }

}

export default GameSearchForm;
