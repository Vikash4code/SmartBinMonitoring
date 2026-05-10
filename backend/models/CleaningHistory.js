const mongoose = require("mongoose");

const cleaningHistorySchema =
    new mongoose.Schema(
        {
            bin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bin",
            },

            binId: {
                type: String,
            },

            worker: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            workerName: {
                type: String,
            },

            vehicle: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vehicle",
            },

            vehicleNumber: {
                type: String,
            },

            cleanedAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports = mongoose.model(
    "CleaningHistory",
    cleaningHistorySchema
);