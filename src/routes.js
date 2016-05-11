import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import UserFormPage from './components/UserFormPage';
import PlayerPage from './components/PlayerPage';
import ScreenshotPage from './components/ScreenshotPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/player/:username/:steamID/:screenshotID', async (req) => {
    return (
      <ScreenshotPage username={req.params.username}
        steamID={req.params.steamID}
        screenshotID={req.params.screenshotID}
      />
    );
  });

  on('/player/:username/:steamID', async (req) => {
    return (
      <PlayerPage username={req.params.username}
        steamID={req.params.steamID}
      />
    );
  });

  on('/', async () => <UserFormPage />);

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
