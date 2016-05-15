import React, { Component, PropTypes } from 'react';
import s from './Swatch.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import tinycolor from 'tinycolor2';
import ReactZeroClipboard from 'react-zeroclipboard';

@withStyles(s)
class Swatch extends Component {
  static propTypes = {
    hexColor: PropTypes.string.isRequired,
    onSelected: PropTypes.func,
    onDeselected: PropTypes.func,
    allowSelection: PropTypes.bool.isRequired,
    initiallySelected: PropTypes.bool.isRequired,
    onCopy: PropTypes.func.isRequired,
    indicateSelected: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: props.initiallySelected,
      showCopyMessage: false,
    };
  }

  onCopy() {
    this.props.onCopy('Copied ' + this.props.hexColor);
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
    if (this.state.selected && this.props.indicateSelected) {
      selectedClass = s.selected;
    }
    const isDark = tinycolor(this.props.hexColor).isDark();
    const darknessClass = isDark ? s.dark : s.light;
    return (
      <span className={s.container}>
        {this.props.allowSelection ? (
          <ReactZeroClipboard text={this.props.hexColor}>
            <button type="button"
              className={cx(s.swatch, s.link, selectedClass, darknessClass)}
              style={swatchStyle}
              title={this.props.hexColor}
              onClick={this.toggleSelected.bind(this)}
            ></button>
          </ReactZeroClipboard>
        ) : (
          <span className={s.disallowSelection}>
            {this.state.selected ? (
              <ReactZeroClipboard text={this.props.hexColor}>
                <button type="button"
                  className={cx(s.swatch, s.link, selectedClass, darknessClass)}
                  style={swatchStyle}
                  title={this.props.hexColor}
                  onClick={this.deselect.bind(this)}
                ></button>
              </ReactZeroClipboard>
            ) : (
              <span
                className={cx(s.swatch, selectedClass, darknessClass)}
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
