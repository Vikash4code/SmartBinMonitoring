const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const binRoutes = require("./routes/binRoutes");

const app = express();

const workerRoutes = require("./routes/workerRoutes");

const vehicleRoutes = require("./routes/vehicleRoutes");

const workerDashboardRoutes = require("./routes/workerDashboardRoutes");

const historyRoutes = require(
    "./routes/historyRoutes"
);

const dashboardRoutes = require(
    "./routes/dashboardRoutes"
);

const path = require("path");

const startBinSimulation =
    require("./utils/binSimulator");

const issueRoutes =
    require(
        "./routes/issueRoutes"
    );
// MIDDLEWARE
app.use(cors());

app.use(express.json());


// DATABASE CONNECTION
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log(error);
    });


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/bin", binRoutes);

app.use("/api/workers", workerRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/worker-dashboard", workerDashboardRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/admin/dashboard", dashboardRoutes);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use(
    "/api/issues",
    issueRoutes
);

// SERVER
const PORT = process.env.PORT || 5000;

// START BIN SIMULATION
startBinSimulation();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



