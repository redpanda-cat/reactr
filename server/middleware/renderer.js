// Server side renderer - injects div layer on current page for client side to draw navigation in

import React from "react";
import ReactDOMServer from "react-dom/server";

const path = require("path");
const fs = require("fs");
const read = require("fs-readdir-recursive");

const jsPath = read(
  path.resolve(__dirname, "..", "..", "build", "static", "js"),
  (name, index, dir) => name.split(".")[2] === "js"
)[0];

export default (req, res, next) => {
  // point to the html file created by CRA's build tool

  const url = req.originalUrl;
  const filePath =
    url === "/"
      ? path.resolve(__dirname, "..", "..", "build", "index.html")
      : path.resolve(__dirname, "..", "..", "pages", url.substr(1));

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("err", err);
      return res.status(404).end();
    }

    return res.send(
      htmlData.replace(
        '<div class="container-fluid main-container">',
        `<div id="app"></div><script type="text/javascript" src="/static/js/${jsPath}"></script><div class="container-fluid main-container">`
      )
    );
  });
};
