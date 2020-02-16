import Router from "next/router";
import storage from "localforage";
import { observable, action } from "mobx";

import { account } from "../../api";
import { STORE_ACCOUNT_KEY, STORE_TOKEN_KEY } from "../../constants";
import AccountState from "./account";

export { AccountState };

const wait = ts => new Promise(resolve => setTimeout(resolve, ts));

class DashboardState {
  @observable loading = true;
  token = false;
  user = false;

  @observable panel = "account";

  constructor() {
    typeof window !== "undefined" && this.init();
  }

  @action setLoading(loading) {
    this.loading = loading;
  }

  @action setPanel(panel) {
    this.panel = panel;
  }

  @action async updateUser(data) {
    this.user = { ...this.user, ...data };
    await storage.setItem("user", this.user);
  }

  @action async init(token, user) {
    try {
      token = token || (await storage.getItem(STORE_TOKEN_KEY));

      if (!token) return Router.push("/login");

      this.token = token;

      AccountState.hydrate();
    } catch (e) {
      console.error(e);
    } finally {
      await wait(300);
      this.loading = false;
    }
  }

  async hasToken() {
    return this.token || (await storage.getItem(STORE_TOKEN_KEY));
  }
}

export default new DashboardState();
