const Joi = require('joi');

const updateAnimalSchema = Joi.object({
  query: Joi.object(),
  params: Joi.object({
    animalId: Joi.string().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    age: Joi.number().integer().min(1).max(150),
    isVaccinated: Joi.bool(),
    gender: Joi.string().valid(...['male', 'female']),
    species: Joi.string().alphanum().min(3).max(30),
  }),
});

module.exports = updateAnimalSchema;
