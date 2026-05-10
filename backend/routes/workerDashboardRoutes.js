const express = require("express");

const router = express.Router();

const Bin = require("../models/Bin");

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const roleMiddleware = require(
    "../middleware/roleMiddleware"
);

const User = require("../models/User");

const Vehicle = require("../models/Vehicle");

const CleaningHistory = require(
    "../models/CleaningHistory"
);


// WORKER ONLY
router.use(authMiddleware);

router.use(roleMiddleware("worker"));


// GET ASSIGNED BINS
router.get("/assigned-bins", async (req, res) => {

    try {

        const bins = await Bin.find({
            assignedWorker: req.user.id,
        }).populate("assignedVehicle");

        res.json(bins);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});


// MARK CLEANED
router.put("/clean/:id", async (req, res) => {

    try {

        const bin = await Bin.findById(
            req.params.id
        )
            .populate("assignedWorker")
            .populate("assignedVehicle");


        if (!bin) {
            return res.status(404).json({
                message: "Bin not found",
            });
        }


        // UPDATE BIN
        bin.cleaned = true;

        bin.fillLevel = 0;

        await bin.save();


        // CREATE HISTORY
        const history =
            new CleaningHistory({
                bin: bin._id,
                binId: bin.binId,

                worker: bin.assignedWorker?._id,
                workerName:
                    bin.assignedWorker?.name,

                vehicle: bin.assignedVehicle?._id,
                vehicleNumber:
                    bin.assignedVehicle
                        ?.vehicleNumber,

                cleanedAt: new Date(),
            });

        await history.save();


        res.json({
            message:
                "Bin cleaned successfully",
            history,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;