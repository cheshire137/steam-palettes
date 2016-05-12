import React, { Component, PropTypes } from 'react';
import s from './Palette.scss';
import withStyles from '../../decorators/withStyles';
import Swatch from '../Swatch';
import tinycolor from 'tinycolor2';

@withStyles(s)
class Palette extends Component {
  static propTypes = {
    bg: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getHexColors() {
    const baseColors = [this.props.bg, this.props.primary, this.props.secondary,
                        this.props.detail];
    const hexColors = [];
    for (let i = 0; i < baseColors.length; i++) {
      hexColors.push(baseColors[i]);
      const color = tinycolor(baseColors[i]);
      this.addVariation(hexColors, color, 'analogous');
      this.addVariation(hexColors, color, 'monochromatic');
    }
    return this.uniq(hexColors);
  }

  addVariation(list, color, funcName) {
    const variations = color[funcName]();
    for (let j = 0; j < variations.length; j++) {
      list.push(variations[j].toHexString());
    }
  }

  uniq(arr) {
    const set = new Set(arr);
    return Array.from(set);
  }

  sample(list, total) {
    const results = [];
    while (results.length < total) {
      results.push(list[Math.floor(Math.random() * list.length)]);
    }
    return results;
  }

  createPalette(allColors, event) {
    const sampledColors = this.sample(allColors, 5).map((c) => {
      return c.replace(/^#/, '');
    });
    const link = event.target;
    link.href = 'http://www.colourlovers.com/palettes/add?colors=' +
                sampledColors.join(',');
    link.blur();
  }

  render() {
    const hexColors = this.getHexColors();
    return (
      <div className={s.container}>
        <a href="#" onClick={this.createPalette.bind(this, hexColors)}
          target="_blank"
        >
          Create random palette
        </a>
        <ul className={s.colors}>
          {hexColors.map((hex) => {
            return (
              <li key={hex} className={s.listItem}>
                <Swatch hexColor={hex} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default Palette;
