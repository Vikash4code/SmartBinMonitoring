const express = require("express");

const router = express.Router();

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


// GET ALL HISTORY
router.get("/", async (req, res) => {

    try {

        const history =
            await CleaningHistory.find()
                .sort({
                    cleanedAt: -1,
                });

        res.json(history);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;