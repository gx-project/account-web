import Router from "next/router";
import storage from "localforage";
import { observable, action } from "mobx";

import { STORE_TOKEN_KEY, STORE_ACCOUNT_KEY } from "../../constants";
import { auth } from "../../api";
import AccountState from "./account";

export { AccountState };

const wait = ts => new Promise(resolve => setTimeout(resolve, ts));

class DashboardState {
  @observable initialized = false;
  @observable token = false;
  @observable panel = "account";

  @action setPanel(panel) {
    this.panel = panel;
  }

  @action async init(token) {
    try {
      await wait(300);
      this.token = token || (await storage.getItem(STORE_TOKEN_KEY));
      if (this.token) await AccountState.hydrate();
    } catch (e) {
      console.error(e);
    } finally {
      this.initialized = true;
    }
  }

  async hasToken() {
    return this.token || (await storage.getItem(STORE_TOKEN_KEY));
  }

  @action async logout() {
    const { ok, data } = await auth.unsign();

    if (!ok) {
      return console.error(data);
    }

    await storage.removeItem(STORE_TOKEN_KEY);
    await storage.removeItem(STORE_ACCOUNT_KEY);

    this.token = false;

    Router.push("/");
  }
}

export default new DashboardState();
