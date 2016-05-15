import SteamAppsList from './steam-apps.json';

class SteamApps {
  static _init() {
    if (typeof this.apps === 'object') {
      return;
    }
    this.apps = SteamAppsList.applist.apps;
    this.apps.sort(this._appSorter.bind(this));
    this._sortedIds = this.apps.map((app) => String(app.appid));
    this._sortedNames = this.apps.map((app) => app.name);
  }

  static search(name) {
    this._init();
    return this.apps.filter((app) => {
      return this._normalizeName(app.name).
                  indexOf(this._normalizeName(name)) === 0;
    });
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
    const index = this._sortedIds.indexOf(String(appId));
    return this._sortedNames[index];
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
