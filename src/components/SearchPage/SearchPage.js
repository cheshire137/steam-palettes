import React, { Component, PropTypes } from 'react';
import s from './SearchPage.scss';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import PlayerSearchForm from '../PlayerSearchForm';
import GameSearchForm from '../GameSearchForm';

const title = 'Find Screenshots - Steam Palettes';

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
        <p className={s.intro}>Find screenshots by Steam game or user:</p>
        <GameSearchForm />
        <PlayerSearchForm />
      </div>
    );
  }

}

export default SearchPage;
