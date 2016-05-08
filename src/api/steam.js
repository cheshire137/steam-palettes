import fetch from '../core/fetch';
import Config from '../config.json';

class Steam {
  // https://wiki.teamfortress.com/wiki/WebAPI/ResolveVanityURL
  static async getSteamId(username) {
    const data = await this.
        makeRequest('/api/steam?format=json' +
                    '&path=/ISteamUser/ResolveVanityURL/v0001/' +
                    '&vanityurl=' + encodeURIComponent(username));
    if (data.response.steamid) {
      return data.response.steamid;
    }
    let message;
    if (data.response.message) {
      message = data.response.message;
    } else {
      message = 'Failed to get Steam ID.';
    }
    throw new Error(message);
  }

  static async getFriends(steamId) {
    const data = await this.get('/api/steam?format=json' +
                                '&path=/ISteamUser/GetFriendList/v0001/' +
                                '&steamid=' + steamId +
                                '&relationship=friend');
    if (data.friendslist) {
      return data;
    }
    throw new Error('Failed to get friends for ' + steamId +
                    '; may not be a public profile.');
  }

  static async makeRequest(path, options) {
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url, options || {});
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
