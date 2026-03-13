require("module-alias/register");
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const responseFormat = require("@/middlewares/responseFormat");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const apiRouter = require("@/routes");
app.use(express.json());

app.use(responseFormat);
app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
