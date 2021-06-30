const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Configuration
const PORT = 5000;
const HOST = "localhost";
const API_SERVICE_URL = "https://api.coinlore.com";

// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get("/", (req, res, next) => {
  res.send("This is a proxy service which proxies to XYZ API.");
});

// // Authorization
// app.use("", (req, res, next) => {
//   if (req.headers.authorization) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

// Proxy endpoints
app.use(
  "/xyzapi",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/xyzapi`]: "",
    },
  })
);

// Start Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
