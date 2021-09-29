const asyncHandler = require('express-async-handler');
const { getCarsRoutes, delCarsRoutes } = require('../model/cars');

// const carModel = require('../model/cars');

const getCars = asyncHandler(async (req, res) => {
  const result = await getCarsRoutes();
  res.status(result.code).json(result);
});

const deleteCar = asyncHandler(async (req, res) => {
  const result = await delCarsRoutes(req.params.id);
  res.status(result.code).json(result);
});

module.exports = { getCars, deleteCar };
