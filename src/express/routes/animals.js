const express = require('express');
const animalController = require('../../modules/animals/controllers');
const createAnimalSchema = require('../../modules/animals/validationSchemas/createAnimal');
const validate = require('../middlewares/validate');
const errorWrapper = require('../../modules/common/utils/errorWrapper');

const router = express.Router();

router.get('/', errorWrapper(animalController.getAnimals));

router.get('/:animalId', errorWrapper(animalController.getAnimalById));

router.post(
  '/',
  validate(createAnimalSchema),
  errorWrapper(animalController.createAnimal),
);

router.put('/:animalId', errorWrapper(animalController.updateAnimal));

module.exports = router;
