const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// GET /tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not create.", error: error.message });
  }
};

// POST /tours
const createTour = async (req, res) => {
  const newTour = await Tour.create({ ...req.body }); // Spread the req.body object

  try {
    if (newTour) {
      res.status(201).json(newTour); // 201 Created
    } else {
      // Handle error (e.g., failed to create tour)
      res
        .status(400)
        .json({
          message:
            "Invalid tour data. Ensure all fields are provided, including 'season' and 'specialOffer'.",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not create.", error: error.message });
  }
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
  const tourId = req.params.tourId;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const tour = await Tour.findById(tourId);

  try {
    if (tour) {
      res.json(tour);
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not find by id.", error: error.message });
  }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const tourId = req.params.tourId;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const updatedTour = await Tour.findByIdAndUpdate(tourId, { ...req.body }); // Spread the req.body object
  try {
    if (updatedTour) {
      res.json(updatedTour);
    } else {
      // Handle update failure (e.g., tour not found)
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Could not find by id and update.",
        error: error.message,
      });
  }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  const tourId = req.params.tourId;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const isDeleted = await Tour.findByIdAndDelete(tourId);

  try {
    if (isDeleted) {
      res.status(204).send(); // 204 No Content
    } else {
      // Handle deletion failure (e.g., tour not found)
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Could not find by id and delete.",
        error: error.message,
      });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
