import { observable, action, toJS } from "mobx";
import storage from "localforage";

import AppState from "../";

import { STORE_ACCOUNT_KEY } from "../../constants";
import { regex } from "../../utils";
import { account } from "../../api";

class DashboardAccount {
  @observable initialized = false;
  @observable loading = { auth: false, password: false, profile: false };
  @observable errors = { password: {}, profile: {}, response: false };
  @observable data = {};

  updateData = {};

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
    } else {
      console.error(data);
    }
  }

  @action setup(data) {
    this.data = data;
    if (!this.initialized) return (this.initialized = true);
  }

  setUpdate(action, data, doUpdate) {
    if (action in this.updateData) {
      Object.assign(this.updateData[action], data);
    } else {
      this.updateData[action] = data;
    }

    if (doUpdate) return this.update();
  }

  @action async update() {
    const [action] = Object.keys(this.updateData);

    if (!action) return;

    this.errors[action] = {};
    this.loading[action] = true;

    if (!this.validation(action)) return;

    const { ok, data, status } = await account.update(
      action,
      this.updateData[action]
    );

    if (!ok) {
      this.handleErrors({ action, status, data });
      return (this.loading[action] = false);
    }

    await this.postUpdate(action, data);

    this.loading[action] = false;
  }

  @action validation(action) {
    switch (action) {
      case "password":
        const {
          password: { current, want }
        } = this.updateData;
        if (!current || current.length < 6) {
          this.errors.password.current =
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

  async postUpdate(action, data) {
    if (action === "photo") {
      await this.hydrate({ photo: data.url });
      return;
    }

    await this.hydrate(this.updateData[action]);
    this.updateData = {};
  }

  handleErrors({ action, status, data }) {
    if (action) {
      switch (action) {
        case "password":
          if (data.message === "invalid password") {
            AppState.setMessage({
              content: "Você errou sua senha atual.",
              type: "error"
            });
          }
          break;
      }
    }
  }
}

export default new DashboardAccount();
