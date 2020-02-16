import { observable, action } from "mobx";
import storage from "localforage";
import Router from "next/router";
import Dashboard from "./dashboard";

import { regex } from "../utils";

import { auth } from "../api";

class LoginState {
  @observable loading = false;
  @observable step = 0;
  @observable number = "";
  @observable password = "";
  @observable user = {
    fn: "",
    profilePic: ""
  };
  @observable error = false;
  @action setNumber(value) {
    this.number = value;
    if (value && value.length === 11 && !regex.phone.test(value)) {
      this.error = "Número inválido";
    } else {
      this.error = false;
    }
  }
  @action setStep(step) {
    this.step = step;
  }

  @action async checkNumber() {
    this.error = false;
    this.loading = true;
    const { data } = await auth.identify(this.number);

    if (data.user) {
      this.step = 1;
      this.user = data.user;
      this.error = false;
    } else {
      this.error = "Usuário não encontrado";
    }
    this.loading = false;
  }

  @action async sendCredential() {
    this.loading = true;
    const { ok, data, status } = await auth.authorize(
      this.number,
      this.password
    );

    if (ok) {
      const { token } = data;

      await storage.setItem("token", token);
      await Dashboard.init(token);

      Router.push("/dashboard");
    } else {
      switch (status) {
        case 401:
          this.error = "Senha incorreta";
          break;
        default:
          this.error = true;
      }
    }

    this.loading = false;
  }

  @action setPassword(pw) {
    this.password = pw;
  }
}

export default new LoginState();
