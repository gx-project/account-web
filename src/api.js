import Router from "next/router";
import { API_ENDPOINT } from "./constants";
import App, { Dashboard } from "./stores";
import fetch from "isomorphic-unfetch";
import storage from "localforage";

async function middleware(request) {
  try {
    App.setLoading(true);
    const response = await request;
    const data = await response.json();
    if (
      response.status === 406 &&
      (data.message === "invalid token" || data.message === "session not found")
    ) {
      await storage.removeItem("token");
      await storage.removeItem("user");
      return Router.replace("/login");
    }

    return {
      error: false,
      status: response.status,
      ok: response.ok,
      response,
      data
    };
  } catch (error) {
    console.error(error);
    return {
      error,
      status: false,
      ok: false,
      response: null,
      data: {}
    };
  } finally {
    App.setLoading(false);
  }
}

export const account = {
  get() {
    return middleware(
      fetch(`${API_ENDPOINT}/account`, {
        headers: {
          Authorization: Dashboard.token
        }
      })
    );
  },
  photo(photo) {
    const body = new FormData();
    body.append("photo", photo, "profile.jpg");

    return middleware(
      fetch(`${API_ENDPOINT}/account/photo`, {
        headers: {
          Authorization: Dashboard.token
        },
        method: "PUT",
        body
      })
    );
  },
  update(action, fields) {
    const body = new FormData();

    for (const field in fields) {
      body.append(field, fields[field]);
    }

    return middleware(
      fetch(`${API_ENDPOINT}/account/${action}`, {
        headers: {
          Authorization: Dashboard.token
        },
        method: "PUT",
        body
      })
    );
  }
};

export const auth = {
  request(endpoint, fields, method = "POST") {
    const body = new FormData();

    for (const field in fields) {
      body.append(field, fields[field]);
    }

    return middleware(
      fetch(`${API_ENDPOINT}/auth/${endpoint}`, {
        method,
        body
      })
    );
  },
  identify(id) {
    return auth.request("identify", { id });
  },
  credential(id, pw) {
    return auth.request("credential", { id, pw });
  },
  code(id, code) {
    return auth.request("code", { id, code });
  }
};

export const register = {
  request(endpoint, fields, method = "POST") {
    const body = new FormData();

    for (const field in fields) {
      body.append(field, fields[field]);
    }

    return middleware(
      fetch(`${API_ENDPOINT}/register/${endpoint}`, {
        method,
        body
      })
    );
  },
  phone(nbr) {
    return register.request("phone", { ncode: "55", nbr });
  },
  code(nbr, code) {
    return register.request("code", { ncode: "55", nbr, code });
  },
  cpf(nbr, code, cpf, birth) {
    return register.request("cpf", { ncode: "55", nbr, code, cpf, birth });
  },
  username(username, fn, ln) {
    return register.request("names", { username, fn, ln });
  }
};
