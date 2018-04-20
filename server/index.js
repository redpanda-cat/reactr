import express from "express";

import serverRenderer from "./middleware/renderer";

import directoryCrawler from "./middleware/directoryCrawler";

const PORT = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");

// initialize application

const app = express();
const router = express.Router();

// Enable CORS for development mode...
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/

// GET for directory crawl
app.get("/api/dirs", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const dirs = directoryCrawler();
  res.json(dirs);
});

// root (/) should serve server rendered page
router.use("^/$", serverRenderer);
router.use("^/*.html", serverRenderer);
router.use(express.static(path.resolve(__dirname, "..", "build")));

// tell app to use above rules
app.use(router);

// start app
app.listen(PORT, error => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
