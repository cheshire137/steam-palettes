import React, { Component, PropTypes } from 'react';
import s from './Swatch.scss';
import withStyles from '../../decorators/withStyles';
import tinycolor from 'tinycolor2';

@withStyles(s)
class Swatch extends Component {
  static propTypes = {
    hexColor: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const swatchStyle = { backgroundColor: this.props.hexColor };
    const isDark = tinycolor(this.props.hexColor).isDark();
    const nameStyle = {
      color: isDark ? '#efefef' : '#000',
    };
    return (
      <div className={s.container} style={swatchStyle}>
        <span className={s.name} style={nameStyle}>
          {this.props.hexColor}
        </span>
      </div>
    );
  }

}

export default Swatch;
