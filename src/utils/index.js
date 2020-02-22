export { default as authMiddleware } from "./authenticate";
export { default as redirect } from "./redirect";
export * from "./regex";

export const wait = ts => new Promise(resolve => setTimeout(resolve, ts));
