import { observable, action } from "mobx";
import AppState from ".";
import Dashboard, { AccountState } from "./dashboard";

import { isValidCPF } from "@brazilian-utils/brazilian-utils";

import { regex } from "../utils";
import { register, auth, account } from "../api";

class RegisterState {
  @observable errors = {};
  @observable termsAccept = false;
  @observable step = 0;
  nbr = "";
  code = "";
  cpf = "";
  birth = "";
  names = {
    username: "",
    fn: "",
    ln: ""
  };
  pw = "";

  @action clear() {
    this.errors = {};
    this.termsAccept = false;
    this.step = 0;
    this.nbr = "";
    this.code = "";
    this.cpf = "";
    this.birth = "";
    this.pw = "";
    this.names = {
      username: "",
      fn: "",
      ln: ""
    };
  }

  @action setError(error) {
    this.error = error;
  }

  /**
   * Validators
   */
  @action checkPhone() {
    this.errors.number = false;
    if (!regex.phone.test(this.nbr)) {
      this.errors.number = "Número inválido";
      return false;
    }

    return true;
  }

  @action checkCPF() {
    this.errors.cpf = false;
    if (!isValidCPF(this.cpf)) {
      this.errors.cpf = "CPF inválido";
      return false;
    }

    return true;
  }

  @action checkBirth() {
    this.errors.birth = false;

    if (new Date(this.birth).toString() === "Invalid Date") {
      this.errors.birth = "Data inválida";
      return false;
    }

    return true;
  }

  @action checkUsername() {
    this.errors.username = false;

    if (!regex.user.test(this.names.username)) {
      this.errors.username = "Usuário inválido";
      return false;
    }

    return true;
  }

  @action checkName(ns) {
    this.errors[ns] = false;

    if (!regex.name.test(this.names[ns])) {
      this.errors[ns] = "Não parece um nome válido";
      return false;
    }

    return true;
  }

  @action checkPassword() {
    this.errors.password = false;

    if (this.pw.length < 6) {
      this.errors.password = "Sua senha precisa ter no mínimo 6 caracteres";
      return false;
    }

    return true;
  }

  /**
   * Setters
   */
  setNumber(value) {
    this.nbr = value;
    this.nbr && this.nbr.length === 11 && this.checkPhone();
  }

  setCPF(cpf) {
    this.cpf = cpf;
    this.cpf.length === 11 && this.checkCPF();
  }

  setBirth({ value }) {
    const day = parseInt(value.slice(0, 2));
    const month = parseInt(value.slice(2, 4));
    const year = parseInt(value.slice(4, 8));
    this.birth = `${month}/${day}/${year}`;

    value.length === 8 && this.checkBirth();
  }

  setNames(key, value) {
    this.names[key] = value;
  }

  setPassword(value) {
    this.pw = value;
  }

  /**
   * Actions
   */
  @action acceptTerms() {
    this.termsAccept = true;
  }

  @action next() {
    ++this.step;
  }

  @action async requestCode() {
    if (!this.checkPhone()) return;

    const { ok, data } = await register.phone(this.nbr);

    if (ok) {
      switch (data.message) {
        case "in use":
          this.errors.number = "Número já cadastrado.";
          break;
        case "ok":
        case "already requested":
          this.next();
      }
    }
  }

  @action async sendCode() {
    if (this.code.length !== 5) return;

    this.errors.code = false;

    const { ok, data } = await register.code(this.nbr, this.code);

    if (ok) {
      this.next();
    } else {
      switch (data.message) {
        case "invalid code":
          this.errors.code = "Código inválido";
          break;
        default:
          AppState.setMessage({
            content: "Ocorreu algum problema interno, tente novamente.",
            type: "error"
          });
      }
    }
  }

  @action async sendCPF() {
    if (!this.checkCPF() || !this.checkBirth()) return;

    const { ok, data } = await register.cpf(
      this.nbr,
      this.code,
      this.cpf,
      this.birth
    );

    if (ok) {
      switch (data.message) {
        case "ok":
          this.next();
          break;
        case "in use":
          this.errors.cpf = "CPF já cadastrado";
          break;
      }
    } else {
      AppState.setMessage({
        content: "Aconteceu algum erro interno, tente novamente.",
        type: "error"
      });
    }
  }

  @action async sendNames() {
    if (!this.checkUsername() || !this.checkName("fn") || !this.checkName("ln"))
      return;

    const { ok, data } = await register.request("names", this.names);

    if (ok && data.message === "ok") {
      this.next();
    } else {
      switch (data.message) {
        case "in use":
          this.errors.username = "Em uso";
          break;
        default:
          this.error = true;
      }
    }
  }

  @action async finish() {
    if (!this.checkPassword()) return;

    const { data } = await register.request("finish", {
      ncode: "55",
      nbr: this.nbr,
      code: this.code,
      cpf: this.cpf,
      birth: this.birth,
      username: this.names.username,
      fn: this.names.fn,
      ln: this.names.ln,
      pw: this.pw,
      terms: this.termsAccept
    });
    switch (data.message) {
      case "ok":
        if (!(await this.login())) return;
        this.next();
        break;
    }
  }

  async login() {
    const { ok, data } = await auth.credential(this.nbr, this.pw);

    if (ok) {
      const { token } = data;

      await AppState.storage.setItem("token", token);
      Dashboard.init(token);
      return true;
    }

    return false;
  }

  async sendPicture(blob) {
    const { ok, data } = await account.photo(blob);

    if (ok) {
      AccountState.hydrate({ photo: data.url });
    }

    return ok;
  }
}

export default new RegisterState();
