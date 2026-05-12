const Bin = require("../models/Bin");


// START BIN SIMULATION
const startBinSimulation = () => {

    setInterval(async () => {

        try {

            // GET ALL BINS
            const bins =
                await Bin.find();

            for (const bin of bins) {

                // ONLY UPDATE IF NOT FULL
                if (bin.fillLevel < 100) {

                    // RANDOM INCREASE
                    const increase =
                        Math.floor(
                            Math.random() * 15
                        ) + 5;

                    let newLevel =
                        bin.fillLevel + increase;

                    // MAX LIMIT
                    if (newLevel > 100) {
                        newLevel = 100;
                    }

                    // UPDATE LEVEL
                    bin.fillLevel =
                        newLevel;

                    // UPDATE CLEANED STATUS
                    if (newLevel > 0) {
                        bin.cleaned = false;
                    }

                    await bin.save();
                }
            }

            console.log(
                "Bin levels updated"
            );

        } catch (error) {

            console.log(error);
        }

    }, 60000); // 1 minute
};


module.exports =
    startBinSimulation;