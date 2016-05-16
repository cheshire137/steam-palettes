import fetch from '../core/fetch';
import jsdom from 'jsdom';
import Promise from 'bluebird';
import SteamApps from '../stores/steamApps';

class ScreenshotScraper {
  constructor(id) {
    this.id = id;
    this.url = 'http://steamcommunity.com/sharedfiles/filedetails/?id=' +
               this.id;
  }

  async getPage() {
    const response = await fetch(this.url);
    const data = await response.text();
    return data;
  }

  getScreenshot(html) {
    return new Promise((resolve, reject) => {
      jsdom.env({
        html,
        done: this.scrapeDom.bind(this, resolve, reject),
      });
    });
  }

  scrapeDom(resolve, reject, err, window) {
    const link = window.document.querySelector('.actualmediactn a');
    const screenshot = { url: this.url };
    if (link) {
      screenshot.fullSizeUrl = link.getAttribute('href');
      const image = link.querySelector('img');
      if (image) {
        screenshot.mediumUrl = image.getAttribute('src');
      }
    }
    const desc = window.document.querySelector('.screenshotDescription');
    if (desc) {
      screenshot.description = desc.innerHTML.trim().replace(/^"|"$/g, '');
    }
    const author = window.document.querySelector('.creatorsBlock');
    if (author) {
      const authorLink = author.querySelector('.friendBlockLinkOverlay');
      if (authorLink) {
        screenshot.userUrl = authorLink.getAttribute('href');
      }
    }
    // metadata like:
    // 0.302 MB
    // May 8 @ 10:01pm
    // 1920 x 1080
    const metadata = window.document.
        querySelectorAll('.detailsStatsContainerRight .detailsStatRight');
    const date = this.getDate(metadata);
    if (date) {
      screenshot.date = date;
    }
    const dimensions = this.getDimensions(metadata);
    if (dimensions) {
      screenshot.width = dimensions[0];
      screenshot.height = dimensions[1];
    }
    const fileSize = this.getFileSize(metadata);
    if (fileSize) {
      screenshot.fileSize = fileSize;
    }
    const game = window.document.querySelector('.apphub_AppName');
    if (game) {
      screenshot.gameName = game.innerHTML.trim();
      const breadcrumbs = window.document.querySelector('.breadcrumbs');
      if (breadcrumbs) {
        const breadcrumbLinks = breadcrumbs.querySelectorAll('a');
        for (let i = 0; i < breadcrumbLinks.length; i++) {
          const breadcrumb = breadcrumbLinks[i];
          if (breadcrumb.innerHTML.trim() === screenshot.gameName) {
            const url = breadcrumb.href;
            const key = '/app/';
            const index = url.indexOf(key) + key.length;
            screenshot.appid = parseInt(url.slice(index), 10);
            break;
          }
        }
      }
    }
    resolve(screenshot);
  }

  getFileSize(metadata) {
    for (let i = 0; i < metadata.length; i++) {
      const text = metadata[i].innerHTML;
      if (text.indexOf('@') < 0 && text.indexOf(' x ') < 0) {
        return text;
      }
    }
  }

  getDimensions(metadata) {
    const divider = ' x ';
    for (let i = 0; i < metadata.length; i++) {
      const text = metadata[i].innerHTML;
      if (text.indexOf(divider) > -1) {
        const dimensions = text.split(divider);
        const width = parseInt(dimensions[0], 10);
        const height = parseInt(dimensions[1], 10);
        return [width, height];
      }
    }
  }

  getDate(metadata) {
    for (let i = 0; i < metadata.length; i++) {
      const text = metadata[i].innerHTML;
      if (text.indexOf('@') > -1) {
        return this.parseDate(text);
      }
    }
  }

  // e.g., Mar 2, 2014 @ 12:55pm
  // e.g., Jul 4 @ 1:17pm
  parseDate(rawDateStr) {
    const dateStr = rawDateStr.trim().toLowerCase();
    const dateAndTime = dateStr.split(/\s+@\s+/);
    const hourAndMinute = dateAndTime[1].split(':'); // 1, 17pm
    let hour = parseInt(hourAndMinute[0], 10);
    const isPM = hourAndMinute[1].indexOf('pm') > -1;
    if (isPM) {
      hour += 12;
    }
    const minute = parseInt(hourAndMinute[1].replace(/[ap]m$/, ''), 10);
    const monthDayYear = dateStr.split(/,\s+/);
    let year = new Date().getFullYear();
    if (monthDayYear.length > 1 && monthDayYear[1].length > 0) {
      year = parseInt(monthDayYear[1], 10);
    }
    const monthDay = monthDayYear[0].split(/\s+/);
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug',
                   'sep', 'oct', 'nov', 'dec'].indexOf(monthDay[0]);
    const day = parseInt(monthDay[1], 10);
    return new Date(year, month, day, hour, minute);
  }
}

export default ScreenshotScraper;
