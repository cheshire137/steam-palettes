import fetch from '../core/fetch';
import Config from '../config.json';

class Api {
  static async makeRequest(path, options) {
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url, options || {});
    const isJSON = path.indexOf('format=json') > -1;
    if (isJSON) {
      const json = await response.json();
      if (response.ok) {
        return json;
      }
      if (json.hasOwnProperty('error')) {
        if (typeof json.error === 'string') {
          throw new Error(json.error);
        } else {
          throw new Error(JSON.stringify(json.error));
        }
      }
    } else {
      const text = await response.text();
      if (response.ok) {
        return text;
      }
    }
    throw new Error(response.statusText);
  }
}

export default Api;
