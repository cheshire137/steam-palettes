import React, { Component, PropTypes } from 'react';
import s from './SearchPage.scss';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import PlayerSearchForm from '../PlayerSearchForm';

const title = 'Find a Steam User';

@withStyles(s)
class SearchPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.container}>
        <Header />
        <PlayerSearchForm />
      </div>
    );
  }

}

export default SearchPage;
