const { getPageLinks } = require("./helper");

class WikiStore {
  constructor() {
    this.wikis = {};
  }

  getWiki(title) {
    return this.wikis[title];
  }

  async addWiki(title) {
    this.wikis[title] = await getPageLinks(title);
    return this.wikis[title];
  }
}

const wikiStore = new WikiStore();

module.exports = wikiStore;
