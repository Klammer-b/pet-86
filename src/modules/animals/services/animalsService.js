const HttpError = require('../../common/models/HttpError');
const animalRepository = require('../repositories/animalsRepository');

class AnimalsService {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

  async getAll(config) {
    return await this.animalRepository.findAll(config);
  }

  async getOneById(id) {
    const animal = await this.animalRepository.findOneById(id);
    if (!animal) {
      throw new HttpError(404, 'Animal is not found');
    }
    return animal;
  }

  async create(payload) {
    return await this.animalRepository.create(payload);
  }

  async updateById(id, payload) {
    const animal = await this.animalRepository.updateById(id, payload);
    if (!animal) {
      throw new HttpError(404, 'Animal is not found');
    }
    return animal;
  }

  async deleteById(id) {
    const animal = await this.animalRepository.deleteById(id);
    if (!animal) {
      throw new HttpError(404, 'Animal is not found');
    }
    return { id };
  }
}

const animalsService = new AnimalsService(animalRepository);

module.exports = animalsService;
