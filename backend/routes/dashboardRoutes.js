const express = require("express");

const router = express.Router();

const Bin = require("../models/Bin");

const User = require("../models/User");

const Vehicle = require("../models/Vehicle");

const CleaningHistory = require(
  "../models/CleaningHistory"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);


// ADMIN ONLY
router.use(authMiddleware);

router.use(roleMiddleware("admin"));


// GET DASHBOARD STATS
router.get("/stats", async (req, res) => {

  try {

    // TOTAL BINS
    const totalBins =
      await Bin.countDocuments();

    // FULL BINS
    const fullBins =
      await Bin.countDocuments({
        fillLevel: { $gte: 70 },
      });

    // CLEANED BINS
    const cleanedBins =
      await Bin.countDocuments({
        cleaned: true,
      });

    // TOTAL WORKERS
    const totalWorkers =
      await User.countDocuments({
        role: "worker",
      });

    // TOTAL VEHICLES
    const totalVehicles =
      await Vehicle.countDocuments();

    // ALERT BINS
    const alertBins =
      await Bin.find({
        fillLevel: { $gte: 90 },
      });

    // RECENT HISTORY
    const recentHistory =
      await CleaningHistory.find()
        .sort({
          cleanedAt: -1,
        })
        .limit(5);


    res.json({

      totalBins,

      fullBins,

      cleanedBins,

      totalWorkers,

      totalVehicles,

      alertBins,

      recentHistory,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;