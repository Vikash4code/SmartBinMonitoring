const Bin = require("../models/Bin");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const CleaningHistory = require("../models/CleaningHistory");

const getDashboardStats = async (req, res) => {
    console.log("Dashboard API HIT");

    try {

        const bins = await Bin.find();

        const users = await User.find();

        const vehicles = await Vehicle.find();

        const history = await CleaningHistory.find();

        console.log("TOTAL BINS:", bins.length);

        console.log("TOTAL USERS:", users.length);

        console.log("TOTAL VEHICLES:", vehicles.length);

        console.log("TOTAL HISTORY:", history.length);

        res.status(200).json({
            totalBins: bins.length,
            fullBins: bins.filter(
                (bin) => bin.fillLevel >= 80
            ).length,

            cleanedBins: bins.filter(
                (bin) => bin.cleaned === true
            ).length,

            pendingBins: bins.filter(
                (bin) => bin.cleaned === false
            ).length,

            activeWorkers: users.filter(
                (user) => user.role === "worker"
            ).length,

            activeVehicles: vehicles.filter(
                (vehicle) => vehicle.status === "active"
            ).length,

            totalCleanings: history.length,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};