import Router from "next/router";

export default function redirect(res, target) {
  if (res) {
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    Router.replace(target);
  }
}
