import Router from "next/router";
import { API_ENDPOINT } from "./constants";
import DashboardState from "./stores/dashboard";
import fetch from "isomorphic-unfetch";
import storage from "localforage";

async function middleware(request) {
  const response = await request;
  if (response.status === 406) {
    await storage.removeItem("token");
    await storage.removeItem("user");
    return Router.replace("/login");
  }

  return {
    status: response.status,
    ok: response.ok,
    data: await response.json()
  };
}

export const account = {
  get() {
    return middleware(
      fetch(`${API_ENDPOINT}/account`, {
        headers: {
          Authorization: DashboardState.token
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
          Authorization: DashboardState.token
        },
        method: "PUT",
        body
      })
    );
  },
  update(action, fields) {
    const body = new FormData();
    body.append("action", action);

    for (const field in fields) {
      body.append(field, fields[field]);
    }

    return middleware(
      fetch(`${API_ENDPOINT}/account`, {
        headers: {
          Authorization: DashboardState.token
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
  code(ref, code) {
    return auth.request("code", { ref, code });
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
