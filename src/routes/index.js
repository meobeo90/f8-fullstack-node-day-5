const express = require("express");
const fs = require("node:fs");
const router = express.Router();

const basePath = "./src/routes";
const postfix = ".route.js";

fs.readdirSync(basePath)
  .filter((_fileName) => _fileName.endsWith(postfix))
  .forEach((fileName) => {
    const resoure = fileName.replace(postfix, "");
    router.use(`/${resoure}`, require(`./${fileName}`));
  });

module.exports = router;
