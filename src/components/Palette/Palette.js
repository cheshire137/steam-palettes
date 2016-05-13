import React, { Component, PropTypes } from 'react';
import s from './Palette.scss';
import withStyles from '../../decorators/withStyles';
import Swatch from '../Swatch';
import tinycolor from 'tinycolor2';
import FontAwesome from 'react-fontawesome';

@withStyles(s)
class Palette extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { selectedColors: [] };
  }

  onColorSelected(color) {
    const colors = this.state.selectedColors.slice();
    if (colors.indexOf(color) < 0) {
      colors.push(color);
    }
    this.setState({ selectedColors: colors });
  }

  onColorDeselected(color) {
    const index = this.state.selectedColors.indexOf(color);
    const head = this.state.selectedColors.slice(0, index);
    const tail = this.state.selectedColors.
        slice(index + 1, this.state.selectedColors.length);
    const colors = head.concat(tail);
    this.setState({ selectedColors: colors });
  }

  getAllColors() {
    const hexColors = [];
    for (let i = 0; i < this.props.colors.length; i++) {
      hexColors.push(this.props.colors[i]);
      const color = tinycolor(this.props.colors[i]);
      this.addVariation(hexColors, color, 'analogous');
      this.addVariation(hexColors, color, 'monochromatic');
    }
    const uniqueColors = this.uniq(hexColors);
    uniqueColors.sort(this.colorSorter.bind(this));
    return uniqueColors;
  }

  // See 'Step sorting' on http://www.alanzucconi.com/2015/09/30/colour-sorting/
  colorSorter(aStr, bStr) {
    const colorA = tinycolor(aStr);
    const colorB = tinycolor(bStr);
    const lumA = colorA.getLuminance();
    const lumB = colorB.getLuminance();
    const hsvA = colorA.toHsv();
    const hsvB = colorB.toHsv();
    const repetitions = 8;
    const h2A = Math.round(hsvA.h * repetitions);
    const h2B = Math.round(hsvB.h * repetitions);
    let lum2A = Math.round(lumA * repetitions);
    let lum2B = Math.round(lumB * repetitions);
    let v2A = Math.round(hsvA.v * repetitions);
    let v2B = Math.round(hsvB.v * repetitions);
    if (h2A % 2 === 1) {
      v2A = repetitions - v2A;
      lum2A = repetitions - lum2A;
    }
    if (h2B % 2 === 1) {
      v2B = repetitions - v2B;
      lum2B = repetitions - lum2B;
    }
    if (h2A < h2B) {
      return -1;
    }
    if (h2A > h2B) {
      return 1;
    }
    if (lum2A < lum2B) {
      return -1;
    }
    if (lum2A > lum2B) {
      return 1;
    }
    if (v2A < v2B) {
      return -1;
    }
    if (v2A > v2B) {
      return 1;
    }
    return 0;
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

  hashStripper(c) {
    return c.replace(/^#/, '');
  }

  setLinkToNewPaletteLink(event, colors) {
    let link = event.target;
    if (link.nodeName !== 'A') {
      link = link.closest('a');
    }
    link.href = 'http://www.colourlovers.com/palettes/add?colors=' +
                colors.map(this.hashStripper).join(',');
    link.blur();
  }

  createPalette(event) {
    this.setLinkToNewPaletteLink(event, this.state.selectedColors.slice());
  }

  createRandomPalette(allColors, event) {
    this.setLinkToNewPaletteLink(event, this.sample(allColors, 5));
  }

  render() {
    const hexColors = this.getAllColors();
    return (
      <div className={s.container}>
        {this.state.selectedColors.length > 0 ? (
          <div className={s.selectedColorsWrapper}>
            <a href="#" onClick={this.createPalette.bind(this)}
              target="_blank"
            >
              <FontAwesome name="external-link" className={s.linkIcon} />
              Create palette
            </a>
            <ul className={s.selectedColors}>
              {this.state.selectedColors.map((hex) => {
                const key = 'selected-' + hex;
                return (
                  <li key={key} className={s.listItem}>
                    <Swatch hexColor={hex}
                      allowSelection={false}
                      onDeselected={this.onColorDeselected.bind(this)}
                      initiallySelected
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : ''}
        <a href="#" onClick={this.createRandomPalette.bind(this, hexColors)}
          target="_blank"
        >
          <FontAwesome name="external-link" className={s.linkIcon} />
          Create random palette
        </a>
        <ul className={s.colors}>
          {hexColors.map((hex) => {
            const allowSelection = this.state.selectedColors.length < 5;
            const initiallySelected =
                this.state.selectedColors.indexOf(hex) > -1;
            const key = hex + '-' + allowSelection + '-' + initiallySelected;
            return (
              <li key={key} className={s.listItem}>
                <Swatch hexColor={hex}
                  onSelected={this.onColorSelected.bind(this)}
                  onDeselected={this.onColorDeselected.bind(this)}
                  allowSelection={allowSelection}
                  initiallySelected={initiallySelected}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default Palette;
