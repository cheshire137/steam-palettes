import React, { Component } from 'react';
import s from './GameSearchForm.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Steam from '../../api/steam';
import FontAwesome from 'react-fontawesome';
import _ from 'underscore-node';

@withStyles(s)
class GameSearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: undefined,
      games: [],
      searchMade: false,
      searching: false,
      showNextPageLink: false,
      showPrevPageLink: false,
      page: 1,
      message: undefined,
    };
    this.delaySearch = _.debounce(this.delaySearch, 500);
  }

  onSteamGamesLoaded(data) {
    this.setState({
      games: data.games,
      searchMade: true,
      searching: false,
      page: data.page,
      message: undefined,
      showNextPageLink: data.totalPages > data.page,
      showPrevPageLink: data.page > 1,
    });
  }

  onSteamGamesLoadError(response) {
    console.error('failed to load Steam games', response);
    this.setState({
      message: 'There was an error searching for Steam games. :(',
      searchMade: true,
      searching: false,
    });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value }, this.search.bind(this));
  }

  loadNextPage(event) {
    event.target.blur();
    this.setState({ page: this.state.page + 1 }, () => {
      this.makeSearch();
    });
  }

  loadPreviousPage(event) {
    event.target.blur();
    this.setState({ page: this.state.page - 1 }, () => {
      this.makeSearch();
    });
  }

  search() {
    this.setState({
      searchMade: false,
      searching: false,
      games: [],
      page: 1,
      message: undefined,
    }, () => {
      if (this.state.name.length > 1) {
        this.delaySearch();
      } else {
        this.setState({ games: [] });
      }
    });
  }

  makeSearch() {
    this.setState({ searching: true });
    Steam.getGames(this.state.name, this.state.page).
          then(this.onSteamGamesLoaded.bind(this)).
          catch(this.onSteamGamesLoadError.bind(this));
  }

  delaySearch() {
    this.makeSearch();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.makeSearch();
  }

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit.bind(this)}>
        <label className={s.label}
          htmlFor="game-name"
        >Steam game:</label>
        <input type="search" autoFocus="autofocus" className={s.textField}
          id="game-name"
          placeholder="e.g., Skyrim"
          onChange={this.onNameChange.bind(this)}
          value={this.state.name}
          disabled={this.state.disabled}
        />
        {this.state.searching ? (
          <FontAwesome name="spinner" spin className={s.spinner} />
        ) : ''}
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
            <li className={s.pagination}>
              {this.state.showPrevPageLink ? (
                <button type="button" className={s.prevPage}
                  onClick={this.loadPreviousPage.bind(this)}
                >
                  <FontAwesome name="chevron-left" className={s.icon} />
                </button>
              ) : ''}
              {this.state.showNextPageLink ? (
                <button type="button" className={s.nextPage}
                  onClick={this.loadNextPage.bind(this)}
                >
                  <FontAwesome name="chevron-right" className={s.icon} />
                </button>
              ) : ''}
            </li>
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
