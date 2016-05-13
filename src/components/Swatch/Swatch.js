import React, { Component, PropTypes } from 'react';
import s from './Swatch.scss';
import withStyles from '../../decorators/withStyles';

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
    return (
      <div className={s.container} style={swatchStyle}
        title={this.props.hexColor}
      >
      </div>
    );
  }

}

export default Swatch;
