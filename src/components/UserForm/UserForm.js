import React, { Component, PropTypes } from 'react';
import s from './UserForm.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Find a Steam User';

@withStyles(s)
class UserForm extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { name: undefined };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.name);
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
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    );
  }

}

export default UserForm;
