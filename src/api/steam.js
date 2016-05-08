import fetch from '../core/fetch';
import Config from '../config.json';

class Steam {
  static async makeRequest(path, optionalOptions) {
    const options = optionalOptions || {};
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url, options);
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
    throw new Error(response.statusText);
  }
}

export default Steam;
