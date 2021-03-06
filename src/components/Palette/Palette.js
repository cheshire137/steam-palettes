import React, { Component, PropTypes } from 'react';
import s from './Palette.scss';
import withStyles from '../../decorators/withStyles';
import Swatch from '../Swatch';
import tinycolor from 'tinycolor2';
import FontAwesome from 'react-fontawesome';
import reactTimeout from 'react-timeout';

@withStyles(s)
class Palette extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    setTimeout: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    const allColors = this.getAllColors(props.colors);
    this.state = {
      selectedColors: this.sample(allColors, 5),
      allColors,
    };
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

  onCopy(copyMessage) {
    this.setState({ copyMessage }, () => {
      this.props.setTimeout(() => {
        this.setState({ copyMessage: undefined });
      }, 2000);
    });
  }

  getAllColors(baseColors) {
    const allColors = [];
    for (let i = 0; i < baseColors.length; i++) {
      allColors.push(baseColors[i]);
      const color = tinycolor(baseColors[i]);
      this.addVariation(allColors, color, 'analogous');
      this.addVariation(allColors, color, 'monochromatic');
    }
    const uniqueColors = this.uniq(allColors);
    uniqueColors.sort(this.colorSorter.bind(this));
    return uniqueColors;
  }

  uniq(arr) {
    const set = new Set(arr);
    return Array.from(set);
  }

  sample(list, total) {
    if (total >= list.length) {
      return list.slice();
    }
    const results = [];
    const getIndex = () => Math.floor(Math.random() * list.length);
    while (results.length < total) {
      let index = getIndex();
      while (results.indexOf(list[index]) > -1) {
        index = getIndex();
      }
      results.push(list[index]);
    }
    return results;
  }

  hashStripper(c) {
    return c.replace(/^#/, '');
  }

  addVariation(list, color, funcName) {
    const variations = color[funcName]();
    for (let j = 0; j < variations.length; j++) {
      list.push(variations[j].toHexString());
    }
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

  createPalette(event) {
    const colors = this.state.selectedColors.slice();
    let link = event.target;
    if (link.nodeName !== 'A') {
      link = link.closest('a');
    }
    link.href = 'http://www.colourlovers.com/palettes/add?colors=' +
                colors.map(this.hashStripper).join(',');
    link.blur();
  }

  createRandomPalette(event) {
    event.preventDefault();
    let button = event.target;
    if (button.nodeName !== 'BUTTON') {
      button = button.closest('button');
    }
    button.blur();
    const selectedColors = this.sample(this.state.allColors.slice(), 5);
    this.setState({ selectedColors });
  }

  clearSelected(event) {
    event.preventDefault();
    let button = event.target;
    if (button.nodeName !== 'BUTTON') {
      button = button.closest('button');
    }
    button.blur();
    this.setState({ selectedColors: [] });
  }

  render() {
    const haveSelectedColors = this.state.selectedColors.length > 0;
    return (
      <div className={s.container}>
        {typeof this.state.copyMessage === 'string' ? (
          <span className={s.copyMessage}>{this.state.copyMessage}</span>
        ) : ''}
        {haveSelectedColors ? (
          <a href="#" onClick={this.createPalette.bind(this)}
            target="_blank"
            className={s.createPalette}
          >
            <FontAwesome name="external-link" className={s.linkIcon} />
            Create palette
          </a>
        ) : ''}
        {haveSelectedColors ? (
          <ul className={s.selectedColors}>
            {this.state.selectedColors.map((hex) => {
              const key = 'selected-' + hex;
              return (
                <li key={key} className={s.listItem}>
                  <Swatch hexColor={hex}
                    allowSelection={false}
                    onDeselected={this.onColorDeselected.bind(this)}
                    initiallySelected
                    onCopy={this.onCopy.bind(this)}
                    indicateSelected={false}
                    large
                  />
                </li>
              );
            })}
          </ul>
        ) : ''}
        <button onClick={this.createRandomPalette.bind(this)}
          title="Shuffle selected colors"
          className={s.shuffle}
          type="button"
        >
          <FontAwesome name="random" className={s.icon} />
        </button>
        {haveSelectedColors ? (
          <button onClick={this.clearSelected.bind(this)}
            title="Clear selected colors"
            type="button"
            className={s.clear}
          >
            <FontAwesome name="times" className={s.icon} />
          </button>
        ) : ''}
        <ul className={s.colors}>
          {this.state.allColors.map((hex) => {
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
                  onCopy={this.onCopy.bind(this)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default reactTimeout(Palette);
