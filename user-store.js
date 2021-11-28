const { nanoid } = require("nanoid");

class UserStore {
  constructor() {
    this.users = [];
  }

  getLeaderboard() {
    let copy = [...this.users];
    copy.sort((u1, u2) => u2.score - u1.score);
    return copy;
  }

  getUser(id) {
    return this.users.find((user) => id === user.id);
  }

  addUser(name) {
    const user = { name, id: nanoid(), score: 0, scope: "" };
    this.users.push(user);
    return user;
  }

  updateUserScore(id, addScore) {
    const index = this.users.findIndex((user) => id === user.id);
    const found = index !== -1;
    if (found) {
      this.users[index].score += addScore;
      return this.users[index];
    }
    return found;
  }

  updateUserScope(id, scope) {
    const index = this.users.findIndex((user) => id === user.id);
    const found = index !== -1;
    if (found) {
      this.users[index].scope = scope;
      return this.users[index];
    }
    return found;
  }
}

const userStore = new UserStore();

module.exports = userStore;
