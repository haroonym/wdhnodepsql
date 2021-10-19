const asyncHandler = require('express-async-handler');
// const{getCars, delCars, patchCars, insertCar} = require('../model/cars');

const carModel = require('../model/cars');

const getCars = asyncHandler(async (req, res) => {
  if (req.query.id) {
    const result = await carModel.getCarByID(req.query);
    res.status(result.code).json(result);
  }
  if (req.query.firstName && req.query.lastName) {
    const result = await carModel.getCarByOwner(req.query);
    res.status(result.code).json(result);
  } else {
    const result = await carModel.getCars();
    res.status(result.code).json(result);
  }
});

const deleteCar = asyncHandler(async (req, res) => {
  const result = await carModel.deleteCar(req.params.id);
  res.status(result.code).json(result);
});

const changeStatusCar = asyncHandler(async (req, res) => {
  const result = await carModel.changeStatusCar(req.params.id, req.body);
  res.status(result.code).json(result);
});

const addCar = asyncHandler(async (req, res) => {
  const result = await carModel.addCar(req.body);
  res.status(result.code).json(result);
});

module.exports = { getCars, deleteCar, changeStatusCar, addCar };
