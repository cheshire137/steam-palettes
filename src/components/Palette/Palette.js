import React, { Component, PropTypes } from 'react';
import s from './Palette.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Palette extends Component {
  static propTypes = {
    bg: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    detail: PropTypes.string,
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
            {this.props.bg}
          </dd>
          <dt>Primary</dt>
          <dd>
            {this.props.primary}
          </dd>
          <dt>Secondary</dt>
          <dd>
            {this.props.secondary}
          </dd>
          <dt>Detail</dt>
          <dd>
            {this.props.detail}
          </dd>
        </dl>
      </div>
    );
  }

}

export default Palette;
