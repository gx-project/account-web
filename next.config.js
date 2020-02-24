module.exports = {};
/*
const withOffline = require("next-offline");

module.exports = withOffline({
  target: "serverless",
  transformManifest: manifest => ["/"].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /.png$/,
        handler: "CacheFirst"
      }
    ]
  },
  devIndicators: {
    autoPrerender: false
  }
});
*/
