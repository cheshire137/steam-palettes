import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import FontAwesome from 'react-fontawesome';

@withStyles(s)
class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    previousUrl: PropTypes.string,
    previousTitle: PropTypes.string,
    previousIcon: PropTypes.string,
    titleIcon: PropTypes.string,
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
                {typeof this.props.previousIcon === 'string' ? (
                  <FontAwesome name={this.props.previousIcon}
                    className={s.icon}
                  />
                ) : ''}
                {this.props.previousTitle}
              </a>
            </span>
          ) : ''}
          {hasTitle ? (
            <span className={s.subtitleWrapper}>
              <span className={s.separator}>/</span>
              <span className={s.subtitle}>
                {typeof this.props.titleIcon === 'string' ? (
                  <FontAwesome name={this.props.titleIcon}
                    className={s.icon}
                  />
                ) : ''}
                {this.props.title}
              </span>
            </span>
          ) : ''}
        </h1>
      </header>
    );
  }
}

export default Header;
