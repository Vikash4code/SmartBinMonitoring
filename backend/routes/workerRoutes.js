const express = require("express");

const router = express.Router();

const {
  getWorkers,
  addWorker,
  deleteWorker,
} = require("../controllers/workerController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);


// ADMIN ONLY
router.use(authMiddleware);

router.use(roleMiddleware("admin"));


// GET ALL
router.get("/", getWorkers);

// ADD
router.post("/", addWorker);

// DELETE
router.delete("/:id", deleteWorker);

module.exports = router;