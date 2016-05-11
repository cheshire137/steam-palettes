import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import PlayerLookupPage from './components/PlayerLookupPage';
import PlayerPage from './components/PlayerPage';
import ScreenshotPage from './components/ScreenshotPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/player/:username/:steamID/:screenshotID', async (req) => {
    const username = req.params.username;
    const steamID = req.params.steamID;
    const screenshotID = req.params.screenshotID;
    const key = username + '-' + steamID + '-' + screenshotID;
    return (
      <ScreenshotPage username={username} steamID={steamID}
        screenshotID={screenshotID} key={key}
      />
    );
  });

  on('/player/:username/:steamID', async (req) => {
    const username = req.params.username;
    const steamID = req.params.steamID;
    const key = username + '-' + steamID;
    return (
      <PlayerPage username={username} steamID={steamID} key={key} />
    );
  });

  on('/', async () => <PlayerLookupPage />);

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
