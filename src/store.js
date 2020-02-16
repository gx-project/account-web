import Router from "next/router";
import storage from "localforage";
import { observable, action } from "mobx";

import { account } from "./api";
import { STORE_ACCOUNT_KEY, STORE_TOKEN_KEY } from "./constants";

const wait = ts => new Promise(resolve => setTimeout(resolve, ts));

class AppState {
  @observable loading = true;
  token = false;
  user = false;

  userFromServerTrys = 0;

  @action setLoading(loading) {
    this.loading = loading;
  }

  @action async updateUser(data) {
    this.user = { ...this.user, ...data };
    await storage.setItem("user", this.user);
  }

  @action async init(token, user) {
    try {
      token = token || (await storage.getItem(STORE_TOKEN_KEY));

      if (token) {
        this.token = token;
        user = user || (await storage.getItem(STORE_ACCOUNT_KEY));

        if (!user) {
          const fromServer = await this.userfromServer();
          await storage.setItem(STORE_ACCOUNT_KEY, fromServer);
          this.user = fromServer;
        } else {
          this.user = user;
        }

        Router.push("/dashboard");
      } else {
        if (/dashboard/.test(window.location.pathname)) Router.push("/login");
      }
    } catch (e) {
      console.error(e);
    } finally {
      await wait(300);
      this.loading = false;
    }
  }

  userfromServer = async () => {
    if (this.userFromServerTrys > 3) {
      this.userFromServerTrys = 0;
      return;
    }
    ++this.userFromServerTrys;
    const { ok, data, status } = await account.get();

    if (ok) {
      return data;
    }

    switch (status) {
      case 406:
        await storage.removeItem(STORE_TOKEN_KEY);
        Router.push("/login");
        break;
      default:
        console.log("error show reload warn");
    }
  };
}

export default new AppState();
