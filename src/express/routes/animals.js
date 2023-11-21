const express = require('express');
const animalController = require('../../modules/animals/controllers');

const router = express.Router();

router.get('/', animalController.getAnimals);

router.get('/:animalId', animalController.getAnimalById);

router.post('/', animalController.createAnimal);

router.put('/:animalId', animalController.updateAnimal);

module.exports = router;

call;
apply(this, ...args);
