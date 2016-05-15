import React, { Component } from 'react';
import s from './PlayerSearchForm.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Location from '../../core/Location';
import parsePath from 'history/lib/parsePath';
import Steam from '../../api/steam';

@withStyles(s)
class PlayerSearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: undefined,
      disabled: false,
      error: false,
      message: 'The Steam profile must be public.',
      noMatch: false,
    };
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSteamIDLoaded(steamID) {
    this.setState({
      disabled: false,
      error: false,
      message: undefined,
    });
    Location.push({
      ...(parsePath('/player/' + encodeURIComponent(this.state.name) + '/' +
                    steamID)),
    });
  }

  onSteamIDLoadError(response) {
    console.error('failed to load Steam ID', response);
    this.setState({
      disabled: false,
      error: true,
      message: 'There was an error looking up your Steam ID. :(',
      noMatch: response.message === 'No match',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      disabled: true,
      message: 'Looking up Steam ID...',
      error: false,
    });
    Steam.getSteamId(this.state.name).
          then(this.onSteamIDLoaded.bind(this)).
          catch(this.onSteamIDLoadError.bind(this));
  }

  render() {
    const messageStyle = {};
    if (typeof this.state.message !== 'string') {
      messageStyle.display = 'none';
    }
    const messageClass = this.state.error ? s.error : s.success;
    return (
      <form className={s.form} onSubmit={this.handleSubmit.bind(this)}>
        <label className={s.label}
          htmlFor="user-name"
        >Steam user name:</label>
        <input type="text" autoFocus="autofocus" className={s.textField}
          id="user-name"
          placeholder="e.g., cheshire137"
          onChange={this.onNameChange.bind(this)}
          value={this.state.name}
          disabled={this.state.disabled}
        />
        <button type="submit" disabled={this.state.disabled}
          className={s.button}
        >
          Search
        </button>
        <p className={cx(s.message, messageClass)} style={messageStyle}>
          {this.state.message}
        </p>
        {this.state.error && this.state.noMatch ? (
          <div className={s.steamInstructions}>
            <p className={s.instruction}>
              Try setting your custom URL in Steam:
            </p>
            <img src={require('./steam-edit-profile.jpg')} width="640"
              height="321" alt="Edit Steam profile"
              className={s.instructionImage}
            />
            <p className={s.instruction}>
              Then, search here for the name you set in that custom URL.
            </p>
          </div>
        ) : ''}
      </form>
    );
  }

}

export default PlayerSearchForm;
