const express = require('express');
const animalController = require('../../modules/animals/controllers');
const createAnimalSchema = require('../../modules/animals/validationSchemas/createAnimal');
const validate = require('../middlewares/validate');
const errorWrapper = require('../../modules/common/utils/errorWrapper');
const updateAnimalSchema = require('../../modules/animals/validationSchemas/updateAnimal');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.get('/', auth, errorWrapper(animalController.getAnimals));

router.get('/:animalId', auth, errorWrapper(animalController.getAnimalById));

router.post(
  '/',
  auth,
  checkRole(['admin']),
  validate(createAnimalSchema),
  errorWrapper(animalController.createAnimal),
);

router.put(
  '/:animalId',
  auth,
  checkRole(['admin']),
  validate(updateAnimalSchema),
  errorWrapper(animalController.updateAnimal),
);

router.delete(
  '/:animalId',
  auth,
  checkRole(['admin']),
  errorWrapper(animalController.deleteAnimal),
);

module.exports = router;
