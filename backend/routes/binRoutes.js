const express = require("express");

const router = express.Router();

const Bin = require("../models/Bin");


// GET ALL BINS
router.get("/all", async (req, res) => {
    try {
        const bins = await Bin.find()
            .populate("assignedWorker", "name")
            .populate("assignedVehicle", "vehicleNumber")
            .sort({
                timestamp: -1,
            });

        res.json(bins);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


// GET LATEST BIN
router.get("/latest", async (req, res) => {
    try {
        const latestBin = await Bin.findOne().sort({
            timestamp: -1,
        });

        res.json(latestBin);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


// ADD BIN
router.post("/", async (req, res) => {
    try {

        const { binId, fillLevel } = req.body;

        const newBin = new Bin({
            binId,
            fillLevel,
        });

        await newBin.save();

        res.status(201).json(newBin);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


// UPDATE BIN
router.put("/:id", async (req, res) => {
    try {

        const updatedBin = await Bin.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.json(updatedBin);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


// DELETE BIN
router.delete("/:id", async (req, res) => {
    try {

        await Bin.findByIdAndDelete(req.params.id);

        res.json({
            message: "Bin deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;
