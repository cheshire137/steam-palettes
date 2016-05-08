import React, { Component, PropTypes } from 'react';
import s from './UserForm.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Find a Steam User';

@withStyles(s)
class UserForm extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div>
        <h1>{title}</h1>
        <p></p>
      </div>
    );
  }

}

export default UserForm;
