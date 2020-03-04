import { observable, action } from "mobx";
import Router from "next/router";
import App from "./app";
import Dashboard from "./dashboard";

import { regex, wait } from "../utils";
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
  @observable codeTarget = "";

  @action setStep(step) {
    this.step = step;
  }

  @action async sendId() {
    this.error = false;

    if (!this.verify()) return;

    const { ok, response } = await auth.identify(this.id);

    if (ok) {
      this.step = 1;
      this.user = await response.json();
      this.error = false;
    } else {
      this.error = "Usuário não encontrado";
    }
  }

  @action async sendCredential() {
    if (!this.verify()) return;

    const { ok, response, status } = await auth.credential(
      this.id,
      this.password
    );

    if (ok) {
      const data = await response.json();
      if (status === 200) {
        this.loading = false;
        this.step = 2;
        this.codeTarget = this.codeTargetIsEqId(data.content)
          ? this.id
          : data.target.padStart(11, "*");
        return;
      }

      await this.authenticated(data.content);
      await wait(3000);
      this.clear();
    } else {
      switch (status) {
        case 422:
          this.error = "Senha inválida";
          break;
        default:
          this.error = true;
      }
    }
  }

  @action async sendCode() {
    if (!this.verify()) return;

    const { ok, response } = await auth.code(this.id, this.code);

    if (ok) {
      await this.authenticated((await response.json()).content);
    } else {
      this.error = "Código inválido";
    }
  }

  codeTargetIsEqId(target) {
    return this.id.slice(this.id.length - 4, this.id.length) === target;
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
    await App.storage.setItem("token", token);
    await Dashboard.init(token);

    Router.push("/dashboard");
  }

  @action clear() {
    this.step = 0;
    this.id = "";
    this.code = "";
    this.password = "";
    this.error = false;
    this.codeTarget = "";
    this.user = {
      fn: "",
      photo: ""
    };
  }
}

export default new LoginState();
