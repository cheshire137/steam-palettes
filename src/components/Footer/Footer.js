import React, { Component } from 'react';
import s from './Footer.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Footer extends Component {

  render() {
    return (
      <footer className={s.footer}>
        <div className={s.innerContainer}>
          &copy; 2016 Sarah Vessels
          <span className={s.separator}></span>
          <a href="https://github.com/cheshire137/steam-palettes"
            target="_blank"
            className={s.link}
          >
            View source
          </a>
        </div>
      </footer>
    );
  }

}

export default Footer;
