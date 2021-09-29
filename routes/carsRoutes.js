const express = require('express');

const { getCars, deleteCar, changeStatusCar, addCar } = require('../controllers/cars');

const router = express.Router();

router.get('/cars', getCars);
router.patch('/cars/:id', changeStatusCar);
router.delete('/cars/:id', deleteCar);
router.post('/cars', addCar);

module.exports = router;
