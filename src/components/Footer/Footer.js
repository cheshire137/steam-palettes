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
        </div>
      </footer>
    );
  }

}

export default Footer;
