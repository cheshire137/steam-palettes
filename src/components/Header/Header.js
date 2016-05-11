import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    previousUrl: PropTypes.string,
    previousTitle: PropTypes.string,
  };

  render() {
    const hasBackLink = typeof this.props.previousUrl === 'string';
    const hasNamedBackLink = typeof this.props.previousTitle === 'string';
    const hasTitle = typeof this.props.title === 'string';
    return (
      <header className={s.header}>
        <h1 className={s.title}>
          {hasBackLink && !hasNamedBackLink ? (
            <a href={this.props.previousUrl} className={s.backLink}
              onClick={Link.handleClick}
            >
              &larr;
            </a>
          ) : ''}
          <a className={s.brand} href="/" onClick={Link.handleClick}>
            Steam Palettes
          </a>
          {hasBackLink && hasNamedBackLink ? (
            <span className={s.backLinkWrapper}>
              <span className={s.separator}>/</span>
              <a href={this.props.previousUrl} className={s.backLink}
                onClick={Link.handleClick}
              >
                {this.props.previousTitle}
              </a>
            </span>
          ) : ''}
          {hasTitle && hasBackLink && hasNamedBackLink ? (
            <span className={s.separator}>/</span>
          ) : ''}
          {hasTitle ? (
            <span className={s.subtitle}>
              {this.props.title}
            </span>
          ) : ''}
        </h1>
      </header>
    );
  }
}

export default Header;
