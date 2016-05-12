import React, { Component, PropTypes } from 'react';
import s from './Swatches.scss';
import withStyles from '../../decorators/withStyles';
import Swatch from '../Swatch';

@withStyles(s)
class Swatches extends Component {
  static propTypes = {
    hexColors: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ul className={s.list}>
        {this.props.hexColors.map((hex) => {
          const key = this.props.name + '-' + hex;
          return (
            <li key={key} className={s.listItem}>
              <Swatch hexColor={hex} />
            </li>
          );
        })}
      </ul>
    );
  }

}

export default Swatches;
