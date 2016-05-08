import fetch from '../core/fetch';
import jsdom from 'jsdom';
import Promise from 'bluebird';

class Scraper {
  constructor(username) {
    this.username = username;
  }

  async getPage() {
    const url = 'http://steamcommunity.com/id/' + this.username +
                '/screenshots/?appid=0&sort=newestfirst&' +
                'browsefilter=myfiles&view=grid';
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  getScreenshots(html) {
    return new Promise((resolve, reject) => {
      jsdom.env({
        html,
        done: this.scrapeDom.bind(this, resolve, reject),
      });
    });
  }

  scrapeDom(resolve, reject, err, window) {
    const selector = '#image_wall .imageWallRow .profile_media_item';
    const links = window.document.querySelectorAll(selector);
    const screenshots = [];
    for (let i = 0; i < links.length; i++) {
      screenshots.push(this.getScreenshotFromLink(links[i]));
    }
    resolve(screenshots);
  }

  getScreenshotFromLink(link) {
    const href = link.getAttribute('href');
    const descEl = link.querySelector('.imgWallHoverDescription');
    let title = '';
    if (descEl) {
      const ellipsis = descEl.querySelector('.ellipsis');
      if (ellipsis) {
        title = ellipsis.innerHTML;
      }
    }
    return {
      url: href,
      title,
    };
  }
}

export default Scraper;
