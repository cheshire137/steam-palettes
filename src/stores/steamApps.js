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
    this._sortedIds = this.apps.map((app) => String(app.appid));
  }

  static randomAppid() {
    const gameIDs = [
      22320,  // Morrowind
      22330,  // Oblivion
      72850,  // Skyrim
      8980,   // Borderlands
      49520,  // Borderlands 2
      252490, // Rust
      413150, // Stardew Valley
      17450,  // Dragon Age: Origins
      2280,   // The Ultimate Doom
      2300,   // Doom 2,
      9050,   // Doom 3
      17460,  // Mass Effect,
      24980,  // Mass Effect 2
      20900,  // The Witcher,
      20920,  // The Witcher 2
      292030, // The Witcher 3
      3900,   // Civ IV
      8930,   // Civ V
      10,     // Counter-Strike
      730,    // Counter-Strike: Global Offensive
      570,    // DotA 2
      440,    // Team Fortress 2
      252950, // Rocket League
      107410, // Arma 3
      236430, // Dark Souls II
      374320, // Dark Souls III
      22300,  // Fallout 3
      22380,  // Fallout New Vegas
      377160, // Fallout 4
      105600, // Terraria
    ];
    const index = Math.floor(Math.random() * gameIDs.length);
    return gameIDs[index];
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
