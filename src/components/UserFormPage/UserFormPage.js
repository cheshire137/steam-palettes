import React, { Component, PropTypes } from 'react';
import s from './UserFormPage.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';
import cx from 'classnames';
import Location from '../../core/Location';
import parsePath from 'history/lib/parsePath';

const title = 'Find a Steam User';

@withStyles(s)
class UserFormPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: undefined,
      disabled: false,
      error: false,
      message: 'The Steam profile must be public.',
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
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
      ...(parsePath('/player/' + steamID)),
    });
  }

  onSteamIDLoadError(response) {
    console.error('failed to load Steam ID', response);
    this.setState({
      disabled: false,
      error: true,
      message: 'There was an error looking up your Steam ID. :(',
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
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit.bind(this)}>
          <h1 className={s.title}>{title}</h1>
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
        </form>
      </div>
    );
  }

}

export default UserFormPage;
