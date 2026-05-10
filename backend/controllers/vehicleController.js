const Vehicle = require("../models/Vehicle");


// GET ALL VEHICLES
const getVehicles = async (req, res) => {
  try {

    const vehicles = await Vehicle.find();

    res.json(vehicles);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD VEHICLE
const addVehicle = async (req, res) => {
  try {

    const {
      vehicleNumber,
      driverName,
      status,
    } = req.body;

    const vehicle = new Vehicle({
      vehicleNumber,
      driverName,
      status,
    });

    await vehicle.save();

    res.status(201).json(vehicle);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE VEHICLE
const deleteVehicle = async (req, res) => {
  try {

    await Vehicle.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Vehicle deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getVehicles,
  addVehicle,
  deleteVehicle,
};