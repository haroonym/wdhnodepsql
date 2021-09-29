const asyncHandler = require('express-async-handler');
const { getCarsRoutes, delCarsRoutes, patchCarsRoutes, insertCarRoutes } = require('../model/cars');

// const carModel = require('../model/cars');

const getCars = asyncHandler(async (req, res) => {
  const result = await getCarsRoutes();
  res.status(result.code).json(result);
});

const deleteCar = asyncHandler(async (req, res) => {
  const result = await delCarsRoutes(req.params.id);
  res.status(result.code).json(result);
});

const changeStatusCar = asyncHandler(async (req, res) => {
  const result = await patchCarsRoutes(req.params.id, req.body);
  res.status(result.code).json(result);
});

const addCar = asyncHandler(async (req, res) => {
  const result = await insertCarRoutes(req.body);
  res.status(result.code).json(result);
});

module.exports = { getCars, deleteCar, changeStatusCar, addCar };
