const mongoose =
    require("mongoose");

const issueSchema =
    new mongoose.Schema({

        workerName: {
            type: String,
        },

        binId: {
            type: String,
        },

        message: {
            type: String,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

module.exports =
    mongoose.model(
        "Issue",
        issueSchema
    );