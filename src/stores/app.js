import { observable, action } from "mobx";
import storage from "localforage";

class AppState {
  @observable loading = false;
  @observable theme = "dark";
  @observable message = {};
  initialized = false;
  baseURL = "";

  @action async init() {
    if (this.initialized) return;

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

    this.initialized = true;
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
