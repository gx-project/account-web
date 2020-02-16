import { observable, action, toJS } from "mobx";
import storage from "localforage";

import { STORE_ACCOUNT_KEY } from "../../constants";
import { regex } from "../../utils";
import { account } from "../../api";

class DashboardAccount {
  @observable initialized = false;
  @observable loading = { authMode: false, password: false, profile: false };
  @observable errors = { password: {}, profile: {}, response: false };
  @observable data = {};

  @observable updateData = { password: {}, profile: {} };

  @action async hydrate(save) {
    if (save) {
      this.data = { ...this.data, ...save };
      await storage.setItem(STORE_ACCOUNT_KEY, toJS(this.data));
      return;
    }

    const cache = await storage.getItem(STORE_ACCOUNT_KEY);

    if (cache) {
      return this.setup(cache);
    }

    const { ok, data } = await account.get();
    if (ok) {
      await storage.setItem(STORE_ACCOUNT_KEY, data);
      this.setup(data);
    }

    this.setup(data);
  }

  @action setup(data) {
    this.data = data;
    if (!this.initialized) return (this.initialized = true);
  }

  @action async update(action) {
    this.loading[action] = true;

    if (!this.validation(action)) return;

    const response = await account.update(action, this.updateData[action]);

    if (!response.ok) {
      this.errors.response = true;
      return (this.loading[action] = false);
    }

    if (`pos_${action}` in this) {
      await this[`pos_${action}`]();
    }

    this.loading[action] = false;
  }

  @action validation(action, content) {
    switch (action) {
      case "passwords":
        const {
          password: { current, want }
        } = this.updateData;
        if (!current || current.length < 6) {
          this.errors.passwords.current =
            "Senhas precisam ter no mínimo 6 caracteres";
          return false;
        }
        if (!want || want.length < 6) {
          this.errors.password.want =
            "Senhas precisam ter no mínimo 6 caracteres";
          return false;
        }
        break;
      case "profile":
        const {
          profile: { fn, ln }
        } = this.updateData;

        if (!fn && !ln) return false;

        if (!regex.name.test(fn)) {
          this.errors.profile.fn = "Não parece um nome válido";
          return false;
        }
        if (!regex.name.test(ln)) {
          this.errors.profile.ln = "Não parece um nome válido";
          return false;
        }

        break;
    }

    return true;
  }

  async pos_profile() {
    await this.hydrate(this.updateData.profile);
    this.updateData.profile = {};
  }

  async pos_authMode() {
    await this.hydrate(this.updateData.authMode);
    this.updateData.authMode = {};
  }
}

export default new DashboardAccount();
