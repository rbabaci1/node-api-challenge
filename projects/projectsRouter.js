const express = require("express");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const project = req.body;

    if (
      !project.hasOwnProperty("name") ||
      !project.hasOwnProperty("description")
    ) {
      res.status(400).json({
        message: "Some info in the body is missing or incorrectly defined.",
      });
    } else {
      const addedProject = await insert(project);

      res.status(201).json(addedProject);
    }
  } catch (err) {
    next({
      error: "The project could not be added at this moment.",
      reason: err.message,
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const projects = await get();

    res.status(200).json(projects);
  } catch (err) {
    next({
      error: "The projects could not be retrieved at this moment.",
      reason: err.message,
    });
  }
});

module.exports = router;
