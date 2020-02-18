import { observable, action } from "mobx";
import storage from "localforage";
import Router from "next/router";
import Dashboard from "./dashboard";

import { regex } from "../utils";
import { auth } from "../api";

class LoginState {
  @observable loading = false;
  @observable step = 0;
  id = "";
  code = "";
  password = "";
  @observable user = {
    fn: "",
    photo: ""
  };
  @observable error = false;

  @action setStep(step) {
    this.step = step;
  }

  @action async sendId() {
    this.error = false;
    this.loading = true;

    if (!this.verify()) return (this.loading = false);

    const { data } = await auth.identify(this.id);

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
    if (!this.verify()) return (this.loading = false);

    const { ok, data, status } = await auth.credential(this.id, this.password);

    if (ok) {
      if (data.next === "code") {
        this.loading = false;
        this.step = 2;
        return;
      }

      await this.authenticated(data.token);
    } else {
      switch (status) {
        case 401:
          this.error = "Senha inválida";
          break;
        default:
          this.error = true;
      }
    }

    this.loading = false;
  }

  @action async sendCode() {
    this.loading = true;

    if (!this.verify()) return (this.loading = false);

    const { ok, data, status } = await auth.code(this.id, this.code);

    if (ok) {
      await this.authenticated(data.token);
    } else {
      this.error = "Código inválido";
    }

    // this.handleError(data, status)

    return (this.loading = false);
  }

  verify() {
    switch (this.step) {
      case 0:
        if (!regex.phone.test(this.id) && !regex.user.test(this.id)) {
          this.error = "Precisa ser um número de celular ou nome de usuário.";
          return false;
        }
        break;
      case 1:
        if (this.password.length < 6) {
          this.error = "Senhas tem no mínimo 6 caracteres.";
          return false;
        }
        break;
      case 2:
        const length = this.code.length;
        if (length !== 5) {
          this.error = `O código de verificação contém 5 digitos, ${
            length === 0 ? "o campo ta vazio" : `você digitou ${length}`
          }.`;
          return false;
        }
        break;
    }
    return true;
  }

  async authenticated(token) {
    await storage.setItem("token", token);
    await Dashboard.init(token);

    Router.push("/dashboard");
  }
}

export default new LoginState();