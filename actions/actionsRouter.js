const express = require("express");
const { get, insert, update, remove } = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/:id", async (req, res, next) => {
  try {
    const action = { project_id: req.params.id, ...req.body };

    if (
      !action.hasOwnProperty("description") ||
      !action.hasOwnProperty("notes")
    ) {
      res.status(400).json({
        message: "Some info in the body is missing or incorrectly defined.",
      });
    } else {
      const addedAction = await insert(action);

      res.status(201).json(addedAction);
    }
  } catch (err) {
    next({
      error: "The action could not be added at this moment.",
      reason: err.message,
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const actions = await get();

    res.status(200).json(actions);
  } catch (err) {
    next({
      error: "The actions could not be retrieved at this moment.",
      reason: err.message,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = { project_id: id, ...req.body };
    const updatedAction = await update(id, changes);

    if (!updatedAction) {
      res
        .status(404)
        .json({ message: "The action with specified ID does not exist." });
    } else {
      res.status(200).json(updatedAction);
    }
  } catch (err) {
    next({
      error: "The action could not be updated at this moment.",
      reason: err.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedaction = await remove(id);

    if (removedaction === 0) {
      res.status(404).json({
        message: "The action with specified ID does not exist.",
      });
    } else {
      res.status(202).json({ message: `action with "id: ${id}" is removed.` });
    }
  } catch (err) {
    next({
      error: "The action could not be removed at this moment.",
      reason: err.message,
    });
  }
});

module.exports = router;
