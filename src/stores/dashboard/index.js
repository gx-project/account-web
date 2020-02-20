import Router from "next/router";
import storage from "localforage";
import { observable, action, toJS } from "mobx";

import { STORE_TOKEN_KEY } from "../../constants";
import AccountState from "./account";

export { AccountState };

const wait = ts => new Promise(resolve => setTimeout(resolve, ts));

class DashboardState {
  @observable loading = true;
  @observable token = false;
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

  @action async init(token) {
    console.log("init", token);
    try {
      this.token = token || (await storage.getItem(STORE_TOKEN_KEY));

      if (this.token) await AccountState.hydrate();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async hasToken() {
    return this.token || (await storage.getItem(STORE_TOKEN_KEY));
  }
}

export default new DashboardState();
