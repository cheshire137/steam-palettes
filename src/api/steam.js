import Api from './api';

class Steam extends Api {
  static async getScreenshots(username) {
    const data = await this.makeRequest('/api/screenshots?user=' +
                                        encodeURIComponent(username) +
                                        '&format=json');
    return data;
  }

  static async getScreenshot(screenshotID) {
    const screenshot =
        await this.makeRequest('/api/screenshot?id=' + screenshotID +
                               '&format=json');
    if (screenshot.date) {
      screenshot.date = new Date(screenshot.date);
    }
    return screenshot;
  }

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

  // communityvisibilitystate 3 means the profile is public.
  static async getPlayerSummary(steamID) {
    const summaries = await this.getPlayerSummaries([steamID]);
    if (summaries.length < 1) {
      throw new Error('Could not find Steam user ' + steamID);
    }
    return summaries[0];
  }

  static async getPlayerSummaries(steamIDs) {
    const batches = [];
    // see https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29
    const batchSize = 100;
    let index = 0;
    while (index < steamIDs.length) {
      const batch = [];
      while (batch.length < batchSize && index < steamIDs.length) {
        batch.push(steamIDs[index]);
        index++;
      }
      batches.push(batch);
    }
    let summaries = [];
    for (let i = 0; i < batches.length; i++) {
      const result =
          await this.makeRequest('/api/steam?format=json' +
                                 '&path=/ISteamUser/GetPlayerSummaries/v0002/' +
                                 '&steamids=' + batches[i].join(','));
      if (result.response) {
        summaries = summaries.concat(result.response.players || []);
      }
    }
    summaries.sort((a, b) => {
      const aName = a.personaname.toLowerCase();
      const bName = b.personaname.toLowerCase();
      return aName.localeCompare(bName);
    });
    return summaries;
  }

  static async getFriends(steamId) {
    const data = await this.
        makeRequest('/api/steam?format=json' +
                    '&path=/ISteamUser/GetFriendList/v0001/' +
                    '&steamid=' + steamId +
                    '&relationship=friend');
    if (data.friendslist) {
      const friendIDs = data.friendslist.friends.map((f) => f.steamid);
      const friends = await this.getPlayerSummaries(friendIDs);
      return friends;
    }
    throw new Error('Failed to get friends for ' + steamId +
                    '; may not be a public profile.');
  }
}

export default Steam;
