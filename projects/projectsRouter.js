const express = require("express");
const { get } = require("../data/helpers/projectModel");

const router = express.Router();

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
