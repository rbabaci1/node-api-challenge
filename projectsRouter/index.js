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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectActions = await getProjectActions(id);

    res.status(200).json(projectActions);
  } catch (err) {
    next({
      error: "The project actions could not be retrieved at this moment.",
      reason: err.message,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const changes = req.body;
    const { id } = req.params;
    const updatedProject = await update(id, changes);

    if (!updatedProject) {
      res
        .status(404)
        .json({ message: "The project with specified ID does not exist." });
    } else {
      res.status(200).json(updatedProject);
    }
  } catch (err) {
    next({
      error: "The project could not be updated at this moment.",
      reason: err.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedProject = await remove(id);

    if (removedProject === 0) {
      res.status(404).json({
        message: "The project with specified ID does not exist.",
      });
    } else {
      res.status(202).json({ message: `Project with "id: ${id}" is removed.` });
    }
  } catch (err) {
    next({
      error: "The project could not be removed at this moment.",
      reason: err.message,
    });
  }
});

module.exports = router;
