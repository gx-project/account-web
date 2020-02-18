import { observable, action } from "mobx";

export { default as Login } from "./login";
export { default as Register } from "./register";
export { default as Dashboard } from "./dashboard";

class AppState {
  @observable message = {
    open: false
  };

  @action setMessage({ content, type, duration = 3000 }) {
    this.message = { open: true, content, type, duration };
  }

  @action handleCloseMessage(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.message = { ...this.message, open: false };
  }
}

export default new AppState();
