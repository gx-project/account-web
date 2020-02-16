import storage from "localforage";
import redirect from "./redirect";

export default async function authMiddleware({ req, res }) {
  if (req)
    return req.headers.authorization
      ? redirect(res, "/dashboard")
      : redirect(res, "/login");

  const token = await storage.getItem("token");

  return token ? redirect(null, "/dashboard") : redirect(null, "/login");
}
