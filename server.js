const express = require("express");
const helmet = require("helmet");
const projectsRouter = require("./projectsRouter");
const actionsRouter = require("./actionsRouter");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

function errorHandler(error, req, res, next) {
  const code = error.status || error.statusCode || 500;

  res.status(code).json(error);
}

server.use(errorHandler);

module.exports = server;
