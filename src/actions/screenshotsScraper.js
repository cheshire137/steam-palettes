import fetch from '../core/fetch';
import jsdom from 'jsdom';
import Promise from 'bluebird';

class ScreenshotsScraper {
  constructor(opts) {
    this.username = opts.username;
    this.appid = opts.appid;
  }

  getUrl(popular) {
    if (typeof this.username === 'string') {
      return 'http://steamcommunity.com/id/' + this.username +
             '/screenshots/?appid=0&sort=newestfirst&' +
             'browsefilter=myfiles&view=grid';
    }
    const filter = popular ? 'trendday' : 'mostrecent';
    return 'http://steamcommunity.com/app/' + this.appid +
           '/screenshots/?sort=newestfirst&p=1&browsefilter=' + filter;
  }

  async getPage(popular) {
    const response = await fetch(this.getUrl(popular));
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
    if (typeof this.username === 'string') {
      this.scrapeUserDom(resolve, reject, err, window);
    } else {
      this.scrapeAppDom(resolve, reject, err, window);
    }
  }

  scrapeUserDom(resolve, reject, err, window) {
    const selector = '#image_wall .imageWallRow .profile_media_item';
    const links = window.document.querySelectorAll(selector);
    const screenshots = [];
    for (let i = 0; i < links.length; i++) {
      screenshots.push(this.getScreenshotFromLink(links[i]));
    }
    resolve(screenshots);
  }

  scrapeAppDom(resolve, reject, err, window) {
    const cards = window.document.querySelectorAll('.apphub_Card');
    const screenshots = [];
    for (let i = 0; i < cards.length; i++) {
      screenshots.push(this.getScreenshotFromCard(cards[i]));
    }
    resolve(screenshots);
  }

  getScreenshotFromLink(link) {
    const url = link.getAttribute('href');
    const descEl = link.querySelector('.imgWallHoverDescription');
    let title = undefined;
    if (descEl) {
      const ellipsis = descEl.querySelector('.ellipsis');
      if (ellipsis) {
        title = ellipsis.innerHTML;
      }
    }
    const id = this.getIDFromUrl(url);
    return { url, title, id };
  }

  getIDFromUrl(url) {
    const prefix = 'id=';
    const index = url.indexOf(prefix);
    return url.slice(index + prefix.length);
  }

  getScreenshotFromCard(card) {
    const url = card.getAttribute('data-modal-content-url');
    const author = card.querySelector('.apphub_CardContentAuthorName');
    let title = '';
    if (author) {
      const authorLinks = author.querySelectorAll('a');
      for (let i = 0; i < authorLinks.length; i++) {
        title += authorLinks[i].innerHTML + ' ';
      }
      title = title.trim();
      if (title.length > 0) {
        title = 'Screenshot by ' + title;
      }
    }
    if (title.length < 1) {
      title = 'Screenshot';
    }
    const id = this.getIDFromUrl(url);
    return { url, title, id };
  }
}

export default ScreenshotsScraper;
