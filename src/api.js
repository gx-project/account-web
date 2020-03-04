import Router from "next/router";
import { API_ENDPOINT, STORE_TOKEN_KEY, STORE_ACCOUNT_KEY } from "./constants";
import { App, Dashboard } from "./stores";
import fetch from "isomorphic-unfetch";

function request(
  endpoint,
  { body, method = "GET", token = false, headers = {} }
) {
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
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

    if (!response.ok) {
      const data = await response.json();
      if (data.code === "100") {
        {
          await App.storage.removeItem(STORE_TOKEN_KEY);
          await App.storage.removeItem(STORE_ACCOUNT_KEY);

          Router.push("/login");
          return { ok: false, data: {} };
        }
      }
    }

    return {
      error: false,
      status: response.status,
      ok: response.ok,
      isJson: /application\/json/.test(response.headers.get("Content-Type")),
      response
    };
  } catch (error) {
    App.setMessage({
      content: "Aconteceu algum problema, tente novamente.",
      type: "error"
    });

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
    console.log(photo);
    const body = new FormData();
    body.append("photo", photo, "profile.jpg");

    return request("/account/photo", { method: "PUT", body, token: true });
  },
  update(action, body, method = "PUT") {
    if (action === "photo") {
      return this.photo(body.photo);
    }

    return request(`/account/${action}`, { body, method, token: true });
  }
};

export const auth = {
  identify(id) {
    return request(`/auth/identify/${id}`, { method: "GET" });
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
