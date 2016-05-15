import React, { Component, PropTypes } from 'react';
import s from './SearchPage.scss';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import PlayerSearchForm from '../PlayerSearchForm';
import GameSearchForm from '../GameSearchForm';
import Steam from '../../api/steam';
import FontAwesome from 'react-fontawesome';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';

const title = 'Find Screenshots - Steam Palettes';

@withStyles(s)
class SearchPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loadingRandomScreenshot: false,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  onRandomScreenshotLoaded(screenshot) {
    const path = '/screenshot/' + screenshot.id;
    Location.push({
      ...(parsePath(path)),
    });
  }

  onRandomScreenshotLoadError(error) {
    console.error('failed to load random screenshot', error);
    this.setState({ loadingRandomScreenshot: false });
  }

  getRandomScreenshot(event) {
    const button = event.target;
    button.blur();
    this.setState({ loadingRandomScreenshot: true });
    Steam.getRandomScreenshot().
          then(this.onRandomScreenshotLoaded.bind(this)).
          catch(this.onRandomScreenshotLoadError.bind(this));
  }

  render() {
    return (
      <div className={s.container}>
        <Header />
        <div className={s.randomWrapper}>
          <button type="button" className={s.randomScreenshot}
            onClick={this.getRandomScreenshot.bind(this)}
            disabled={this.state.loadingRandomScreenshot}
          >
            View random screenshot
          </button>
          {this.state.loadingRandomScreenshot ? (
            <FontAwesome name="spinner" spin className={s.spinner} />
          ) : ''}
        </div>
        <hr className={s.divider} />
        <p className={s.intro}>Or find screenshots by Steam game or user:</p>
        <GameSearchForm />
        <PlayerSearchForm />
      </div>
    );
  }

}

export default SearchPage;
