import React, { Component, PropTypes } from 'react';
import s from './Palette.scss';
import withStyles from '../../decorators/withStyles';
import Swatch from '../Swatch';

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
        <h3 className={s.title}>Palette</h3>
        <dl className={s.colors}>
          <dt>Background</dt>
          <dd>
            <Swatch hexColor={this.props.bg} />
          </dd>
          <dt>Primary</dt>
          <dd>
            <Swatch hexColor={this.props.primary} />
          </dd>
          <dt>Secondary</dt>
          <dd>
            <Swatch hexColor={this.props.secondary} />
          </dd>
          <dt>Detail</dt>
          <dd>
            <Swatch hexColor={this.props.detail} />
          </dd>
        </dl>
      </div>
    );
  }

}

export default Palette;
