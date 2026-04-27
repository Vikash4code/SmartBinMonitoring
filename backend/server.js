require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const Bin = require('./models/Bin');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
app.get('/', (req, res) => {
    res.send('Smart Bin API is running');
});

//to save bin
app.post('/api/bin', async (req, res) => {
    try {
        const { binId, fillLevel } = req.body;

        if (binId === undefined || fillLevel === undefined) {
            return res.status(400).json({
                error: 'binId and fillLevel are required'
            });
        }
        const newBin = new Bin({ binId, fillLevel });
        await newBin.save();

        res.status(201).json({
            message: 'Data saved successfully',
            data: newBin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//to delete bin
app.delete("/api/bin/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBin = await Bin.findByIdAndDelete(id);

        if (!deletedBin) {
            return res.status(404).json({ message: "Bin not found" });
        }

        res.json({ message: "Bin deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting bin" });
    }
});

app.get('/api/bin/latest', async (req, res) => {
    try {
        const latestBin = await Bin.findOne().sort({ timestamp: -1 });
        if (!latestBin) {
            return res.status(404).json({
                message: 'No data found'
            });
        }
        res.status(200).json(latestBin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get("/api/bin/all", async (req, res) => {
    try {
        const bins = await Bin.find().sort({ timestamp: -1 });
        res.json(bins);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bins", error });
    }
});

// ✏️ UPDATE BIN
app.put("/api/bin/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { binId, fillLevel } = req.body;

        const updatedBin = await Bin.findByIdAndUpdate(
            id,
            { binId, fillLevel },
            { new: true }
        );

        if (!updatedBin) {
            return res.status(404).json({ message: "Bin not found" });
        }

        res.json({
            message: "Bin updated successfully",
            data: updatedBin
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating bin" });
    }
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});