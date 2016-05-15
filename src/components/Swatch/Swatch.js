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
    allowSelection: PropTypes.bool.isRequired,
    initiallySelected: PropTypes.bool.isRequired,
    onCopy: PropTypes.func.isRequired,
    indicateSelected: PropTypes.bool,
    large: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: props.initiallySelected,
      showCopyMessage: false,
    };
  }

  onCopy() {
    console.log('should copy ' + this.props.hexColor);
    // this.props.onCopy('Copied ' + this.props.hexColor);
  }

  propagateSelected() {
    if (this.state.selected) {
      this.props.onSelected(this.props.hexColor);
    } else {
      this.props.onDeselected(this.props.hexColor);
    }
  }

  toggleSelected(event) {
    event.preventDefault();
    this.onCopy();
    this.setState({ selected: !this.state.selected },
                  this.propagateSelected.bind(this));
  }

  deselect(event) {
    event.preventDefault();
    this.onCopy();
    this.setState({ selected: false }, this.propagateSelected.bind(this));
  }

  render() {
    const swatchStyle = { backgroundColor: this.props.hexColor };
    let selectedClass = s.unselected;
    const indicateSelected =
        typeof this.props.indicateSelected === 'undefined' ? true :
        this.props.indicateSelected;
    if (this.state.selected && indicateSelected) {
      selectedClass = s.selected;
    }
    const isDark = tinycolor(this.props.hexColor).isDark();
    const darknessClass = isDark ? s.dark : s.light;
    let sizeClass = s.normal;
    if (typeof this.props.large === 'boolean' && this.props.large) {
      sizeClass = s.large;
    }
    return (
      <span className={s.container}>
        {this.props.allowSelection ? (
          <button type="button"
            className={cx(s.swatch, s.link, sizeClass, selectedClass, darknessClass)}
            style={swatchStyle}
            title={this.props.hexColor}
            onClick={this.toggleSelected.bind(this)}
          ></button>
        ) : (
          <span className={s.disallowSelection}>
            {this.state.selected ? (
              <button type="button"
                className={cx(s.swatch, s.link, sizeClass, selectedClass, darknessClass)}
                style={swatchStyle}
                title={this.props.hexColor}
                onClick={this.deselect.bind(this)}
              ></button>
            ) : (
              <span
                className={cx(s.swatch, selectedClass, sizeClass, darknessClass)}
                style={swatchStyle}
                title={this.props.hexColor}
              ></span>
            )}
          </span>
        )}
      </span>
    );
  }

}

export default Swatch;
