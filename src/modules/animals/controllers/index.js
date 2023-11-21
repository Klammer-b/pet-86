const animalsService = require('../services/animalsService');

class AnimalController {
  constructor(animalsService) {
    this.animalsService = animalsService;
  }

  getAnimalById = async (req, res) => {
    const { animalId } = req.params;
    const animal = await this.animalsService.getOneById(animalId);
    res.json({
      status: 200,
      message: 'Successfully retrieved animal!',
      data: animal,
    });
  };

  getAnimals = async (req, res) => {
    const animals = await this.animalsService.getAll();
    res.json({
      status: 200,
      message: 'Successfully retrieved all animals!',
      data: animals,
    });
  };

  createAnimal = async (req, res) => {
    const animal = await this.animalsService.create(req.body);
    res.json({
      status: 201,
      message: 'Successfully created an animal!',
      data: animal,
    });
  };

  updateAnimal = (req, res) => {
    const { animalId } = req.params;

    res.json({ message: `Update animal with id ${animalId}` });
  };
}

const animalController = new AnimalController(animalsService);

module.exports = animalController;
