import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Header extends Component {
  render() {
    return (
      <header className={s.header}>
        <h1 className={s.title}>
          <a className={s.brand} href="/" onClick={Link.handleClick}>
            Steam Palettes
          </a>
        </h1>
      </header>
    );
  }
}

export default Header;
