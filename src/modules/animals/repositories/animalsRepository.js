const path = require('node:path');
const fs = require('node:fs/promises');
const Animal = require('../models/animal');

class AnimalsRepository {
  async findAll(config) {
    const { page, limit, isVaccinated, sortBy, order, minAge } = config;
    const skip = (page - 1) * limit;

    const animalsQuery = Animal.find()
      .where('deletedAt')
      .equals(null)
      .skip(skip)
      .limit(limit);

    const countQuery = Animal.countDocuments().where('deletedAt').equals(null);

    if (isVaccinated) {
      animalsQuery.where('isVaccinated').equals(isVaccinated);
      countQuery.where('isVaccinated').equals(isVaccinated);
    }

    if (minAge) {
      animalsQuery.where('age').gte(minAge);
      countQuery.where('age').gte(minAge);
    }

    if (sortBy) {
      animalsQuery.sort({
        [sortBy]: order,
      });
    }

    const animals = await animalsQuery.maxTimeMS(10).exec();
    const count = await countQuery.exec();

    return { animals, count };
  }

  async findOneById(animalId) {
    const animal = await Animal.findById(animalId)
      .where('deletedAt')
      .equals(null);
    return animal;
  }

  async create(payload) {
    const animal = new Animal(payload);
    await animal.save();

    return animal;
  }

  async updateById(animalId, payload) {
    const animal = await this.findOneById(animalId);
    if (!animal) {
      return;
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, payload, {
      returnOriginal: false,
    });
    return updatedAnimal;
  }

  async deleteById(animalId) {
    const animal = await this.findOneById(animalId);
    if (!animal) {
      return;
    }

    await Animal.findByIdAndUpdate(animalId, {
      $set: {
        deletedAt: new Date(),
      },
    });
    return animalId;
  }
}

const animalRepository = new AnimalsRepository();

module.exports = animalRepository;
