/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import Config from './config.json';
import fetch from './core/fetch';
import ScreenshotsScraper from './actions/screenshotsScraper';
import ScreenshotScraper from './actions/screenshotScraper';
import ImageAnalyzer from './actions/imageAnalyzer';

const server = global.server = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

server.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin',
             Config[process.env.NODE_ENV].clientUri);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

server.get('/api/steam', async (req, res) => {
  let url = req.query.path;
  let isXml = false;
  for (const key in req.query) {
    if (key !== 'path') {
      const joiner = url.indexOf('?') > -1 ? '&' : '?';
      url = url + joiner + key + '=' + encodeURIComponent(req.query[key]);
    }
    if (key === 'xml') {
      isXml = true;
    }
  }
  if (isXml) {
    url = 'http://steamcommunity.com' + url;
  } else {
    url = 'http://api.steampowered.com' + url +
          (url.indexOf('?') > -1 ? '&' : '?') + 'key=' +
          process.env.STEAM_API_KEY;
  }
  const response = await fetch(url);
  const data = isXml ? await response.text() : await response.json();
  if (isXml) {
    res.set('Content-Type', 'text/xml');
    res.send(data);
  } else {
    res.json(data);
  }
});

server.get('/api/screenshot', async (req, res) => {
  const screenshotID = req.query.id;
  if (typeof screenshotID !== 'string' || screenshotID.length < 1) {
    res.status(400).
        json({ error: 'Must provide Steam screenshot ID in id param' });
    return;
  }
  const scraper = new ScreenshotScraper(screenshotID);
  const html = await scraper.getPage();
  scraper.getScreenshot(html).then((screenshot) => {
    res.json(screenshot);
  }).fail((error) => {
    res.status(400).json({ error });
  });
});

server.get('/api/screenshots', async (req, res) => {
  const username = req.query.user;
  if (typeof username !== 'string' || username.length < 1) {
    res.status(400).
        json({ error: 'Must provide Steam user name in user param' });
    return;
  }
  const scraper = new ScreenshotsScraper(username);
  const html = await scraper.getPage();
  scraper.getScreenshots(html).then((screenshots) => {
    res.json(screenshots);
  }).fail((error) => {
    res.status(400).json({ error });
  });
});

server.get('/api/colors', async (req, res) => {
  const imageUrl = req.query.url;
  if (typeof imageUrl !== 'string' || imageUrl.length < 1) {
    res.status(400).
        json({ error: 'Must provide image URL in url param' });
    return;
  }
  const analyzer = new ImageAnalyzer();
  analyzer.getColors(imageUrl).then((colors) => {
    res.json(colors);
  }).fail((error) => {
    res.status(400).json({ error });
  });
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
