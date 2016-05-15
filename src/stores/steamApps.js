import SteamAppsList from './steam-apps.json';
import lunr from 'lunr';

const SteamAppsIndex = lunr(function lunrInit() {
  this.field('name', { boost: 10 });
  this.ref('appid');
});

class SteamApps {
  static _init() {
    if (typeof this.apps === 'object') {
      return;
    }
    this.apps = SteamAppsList.applist.apps;
    this.apps.sort(this._appSorter.bind(this));
    this._appsByID = {};
    for (let i = 0; i < this.apps.length; i++) {
      const app = this.apps[i];
      SteamAppsIndex.add({
        name: app.name.trim().toLowerCase(),
        appid: app.appid,
      });
      this._appsByID[app.appid] = app;
    }
    console.log('indexed ' + this.apps.length + ' games');
    this._sortedIds = this.apps.map((app) => String(app.appid));
  }

  static search(name) {
    this._init();
    const appIDs = SteamAppsIndex.search(name.toLowerCase()).map((r) => r.ref);
    return appIDs.map((id) => this._appsByID[id]);
  }

  static _appSorter(a, b) {
    const aName = this._normalizeName(a.name);
    const bName = this._normalizeName(b.name);
    return aName.localeCompare(bName);
  }

  static _normalizeName(rawName) {
    let name = rawName.toLowerCase();
    if (name.indexOf('the ') === 0) {
      name = name.substring(4);
    }
    if (name.indexOf('a ') === 0) {
      name = name.substring(2);
    }
    return name;
  }

  static getName(appId) {
    this._init();
    return this._appsByID[appId].name;
  }

  static _idSorter(a, b) {
    const indexA = this._sortedIds.indexOf(String(a));
    const indexB = this._sortedIds.indexOf(String(b));
    if (indexA < indexB) {
      return -1;
    }
    return indexA > indexB ? 1 : 0;
  }

  static sortIds(appIds) {
    this._init();
    appIds.sort(this._idSorter.bind(this));
    return appIds;
  }
}

export default SteamApps;
