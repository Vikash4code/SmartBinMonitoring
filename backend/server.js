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
// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



