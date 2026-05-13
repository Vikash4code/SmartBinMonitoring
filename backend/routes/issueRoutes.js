const express =
    require("express");

const router =
    express.Router();

const Issue =
    require("../models/Issue");

const authMiddleware =
    require(
        "../middleware/authMiddleware"
    );


// CREATE ISSUE
router.post(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const issue =
                new Issue({

                    workerName:
                        req.body.workerName,

                    binId:
                        req.body.binId,

                    message:
                        req.body.message,
                });

            await issue.save();

            res.json({
                message:
                    "Issue reported successfully",
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);


// GET ALL ISSUES
router.get(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const issues =
                await Issue.find()
                    .sort({
                        createdAt: -1,
                    });

            res.json(issues);

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

module.exports =
    router;