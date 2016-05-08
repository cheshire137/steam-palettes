import React, { Component, PropTypes } from 'react';
import s from './UserForm.scss';
import withStyles from '../../decorators/withStyles';
import Steam from '../../api/steam';

const title = 'Find a Steam User';

@withStyles(s)
class UserForm extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { name: undefined, disabled: false };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSteamIDLoaded(steamID) {
    console.log('steam id', steamID);
    this.setState({ disabled: false });
  }

  onSteamIDLoadError(response) {
    console.error('failed to load Steam ID', response);
    this.setState({ disabled: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ disabled: true });
    Steam.getSteamId(this.state.name).
          then(this.onSteamIDLoaded.bind(this)).
          catch(this.onSteamIDLoadError.bind(this));
  }

  render() {
    return (
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
      </form>
    );
  }

}

export default UserForm;
