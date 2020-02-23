import { observable, action } from "mobx";
import storage from "localforage";

export { default as Login } from "./login";
export { default as Register } from "./register";
export { default as Dashboard } from "./dashboard";

class AppState {
  @observable loading = false;
  @observable theme = "dark";
  @observable message = {};
  baseURL = "";

  constructor() {
    if (typeof window !== "undefined") this.init();
  }

  @action async init() {
    this.storage = storage.createInstance({
      driver: storage.INDEXEDDB,
      name: "GuruWebApp",
      version: 1.0,
      storeName: "Account"
    });

    const theme = await this.storage.getItem("theme");

    if (theme) {
      this.theme = theme;
    }
  }

  @action toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    this.storage.setItem("theme", this.theme);
  }

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
