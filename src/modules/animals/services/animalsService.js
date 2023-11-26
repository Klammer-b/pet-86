const HttpError = require('../../common/models/HttpError');
const Animal = require('../models/animal');
const animalRepository = require('../repositories/animalsRepository');

class AnimalsService {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

  async getAll() {
    return await this.animalRepository.findAll();
  }

  async getOneById(id) {
    const animal = await this.animalRepository.findOneById(id);
    if (!animal) {
      throw new HttpError(404, 'Animal is not found');
    }
    return animal;
  }

  async create(payload) {
    const animal = new Animal(payload);
    return await this.animalRepository.create(animal);
  }

  updateById(id, payload) {}
}

const animalsService = new AnimalsService(animalRepository);

module.exports = animalsService;
