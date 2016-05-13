import React, { Component, PropTypes } from 'react';
import s from './Swatch.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import tinycolor from 'tinycolor2';

@withStyles(s)
class Swatch extends Component {
  static propTypes = {
    hexColor: PropTypes.string.isRequired,
    onSelected: PropTypes.func,
    onDeselected: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { selected: false };
  }

  toggleSelected(event) {
    event.preventDefault();
    this.setState({ selected: !this.state.selected }, () => {
      if (this.state.selected) {
        this.props.onSelected(this.props.hexColor);
      } else {
        this.props.onDeselected(this.props.hexColor);
      }
    });
  }

  render() {
    const swatchStyle = { backgroundColor: this.props.hexColor };
    const selectedClass = this.state.selected ? s.selected : s.unselected;
    const isDark = tinycolor(this.props.hexColor).isDark();
    const darknessClass = isDark ? s.dark : s.light;
    const allowSelection = typeof this.props.onSelected === 'function' &&
        typeof this.props.onDeselected === 'function';
    return (
      <span className={s.outerContainer}>
        {allowSelection ? (
          <a href="#" className={cx(s.container, selectedClass, darknessClass)}
            style={swatchStyle}
            title={this.props.hexColor}
            onClick={this.toggleSelected.bind(this)}
          ></a>
        ) : (
          <span href="#"
            className={cx(s.container, selectedClass, darknessClass)}
            style={swatchStyle}
            title={this.props.hexColor}
          ></span>
        )}
      </span>
    );
  }

}

export default Swatch;
