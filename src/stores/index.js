import { observable, action } from "mobx";

export { default as Login } from "./login";
export { default as Register } from "./register";
export { default as Dashboard } from "./dashboard";

class AppState {
  @observable loading = false;
  @observable message = {};

  @action setLoading(value) {
    this.loading = value;
  }

  @action setMessage({ content, type, duration = 3000, variant = "filled" }) {
    this.message = { open: true, content, type, duration, variant };
  }

  @action handleCloseMessage(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.message = { ...this.message, open: false };
  }
}

export default new AppState();
