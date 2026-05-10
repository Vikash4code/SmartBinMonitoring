const User = require("../models/User");

const bcrypt = require("bcryptjs");


// GET ALL WORKERS
const getWorkers = async (req, res) => {
  try {

    const workers = await User.find({
      role: "worker",
    }).select("-password");

    res.json(workers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD WORKER
const addWorker = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingWorker = await User.findOne({
      email,
    });

    if (existingWorker) {
      return res.status(400).json({
        message: "Worker already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const worker = new User({
      name,
      email,
      password: hashedPassword,
      role: "worker",
    });

    await worker.save();

    res.status(201).json(worker);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE WORKER
const deleteWorker = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Worker deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getWorkers,
  addWorker,
  deleteWorker,
};