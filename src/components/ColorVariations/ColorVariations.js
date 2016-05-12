import React, { Component, PropTypes } from 'react';
import s from './ColorVariations.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import tinycolor from 'tinycolor2';
import Swatches from '../Swatches';

@withStyles(s)
class ColorVariations extends Component {
  static propTypes = {
    hexColor: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  uniq(arr) {
    const set = new Set(arr);
    return Array.from(set);
  }

  render() {
    const color = tinycolor(this.props.hexColor);
    const hexer = (c) => c.toHexString();
    const analogous = this.uniq(color.analogous().map(hexer));
    const monochromatic = this.uniq(color.monochromatic().map(hexer));
    const splitcomplement = this.uniq(color.splitcomplement().map(hexer));
    return (
      <div className={s.container}>
        <div className={cx(s.analogous, s.wrapper)}>
          <Swatches name="analogous" hexColors={analogous} />
        </div>
        <div className={cx(s.monochromatic, s.wrapper)}>
          <Swatches name="monochromatic" hexColors={monochromatic} />
        </div>
        <div className={cx(s.splitcomplement, s.wrapper)}>
          <Swatches name="splitcomplement" hexColors={splitcomplement} />
        </div>
      </div>
    );
  }

}

export default ColorVariations;
