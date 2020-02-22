import Router from "next/router";
import { API_ENDPOINT, STORE_TOKEN_KEY, STORE_ACCOUNT_KEY } from "./constants";
import App, { Dashboard } from "./stores";
import fetch from "isomorphic-unfetch";
import storage from "localforage";

function request(
  endpoint,
  { body: content, method = "GET", token = false, headers = {} }
) {
  let body;

  if (content instanceof Object) {
    body = new FormData();
    for (const field in content) {
      body.append(field, content[field]);
    }
  } else {
    body = content;
  }

  if (token) {
    headers.Authorization = Dashboard.token;
  }

  return middleware(
    fetch(`${API_ENDPOINT}${endpoint}`, {
      method,
      headers,
      body
    })
  );
}

async function middleware(request) {
  try {
    App.setLoading(true);
    const response = await request;
    const data = await response.json();
    if (
      response.status === 406 &&
      (data.message === "invalid token" || data.message === "invalid session")
    ) {
      console.log("??");
      await storage.removeItem(STORE_TOKEN_KEY);
      await storage.removeItem(STORE_ACCOUNT_KEY);
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
    return request("/account", { token: true });
  },
  photo(photo) {
    const body = new FormData();
    body.append("photo", photo, "profile.jpg");

    return request("/account/photo", { method: "PUT", body, token: true });
    /*return middleware(
      fetch(`${API_ENDPOINT}/account/photo`, {
        headers: {
          Authorization: Dashboard.token
        },
        method: "PUT",
        body
      })
    );*/
  },
  update(action, body) {
    return request(`/account/${action}`, { body, method: "PUT", token: true });
    /*
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
    );*/
  }
};

export const auth = {
  identify(id) {
    return request("/auth/identify", { method: "POST", body: { id } });
  },
  credential(id, pw) {
    return request("/auth/credential", { method: "POST", body: { id, pw } });
  },
  code(id, code) {
    return request("/auth/code", { method: "POST", body: { id, code } });
  },
  unsign() {
    return request("/auth/unsign", { method: "POST", token: true });
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
