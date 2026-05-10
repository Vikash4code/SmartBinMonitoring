const express = require("express");

const router = express.Router();

const {
  getVehicles,
  addVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);


// ADMIN ONLY
router.use(authMiddleware);

router.use(roleMiddleware("admin"));


// GET
router.get("/", getVehicles);

// POST
router.post("/", addVehicle);

// DELETE
router.delete("/:id", deleteVehicle);

module.exports = router;