import React, { Component, PropTypes } from 'react';
import s from './Palette.scss';
import withStyles from '../../decorators/withStyles';
import ColorVariations from '../ColorVariations';

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

  render() {
    return (
      <div className={s.container}>
        <ul className={s.colors}>
          <li>
            <ColorVariations hexColor={this.props.bg} />
          </li>
          <li>
            <ColorVariations hexColor={this.props.primary} />
          </li>
          <li>
            <ColorVariations hexColor={this.props.secondary} />
          </li>
          <li>
            <ColorVariations hexColor={this.props.detail} />
          </li>
        </ul>
      </div>
    );
  }

}

export default Palette;
