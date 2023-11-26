const path = require('node:path');
const fs = require('node:fs/promises');

class AnimalsRepository {
  dbPath = path.join(process.cwd(), 'db.json');

  async readDB() {
    const content = await fs.readFile(this.dbPath);
    const entries = JSON.parse(content.toString());
    return entries;
  }

  async writeDB(db) {
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile(this.dbPath, content);
  }

  async findAll() {
    const db = await this.readDB();
    return db.animals;
  }

  async findOneById(animalId) {
    const db = await this.readDB();
    const animal = db.animals.find(({ id }) => id === animalId);
    return animal;
  }

  async create(animal) {
    const db = await this.readDB();
    db.animals.push(animal);
    await this.writeDB(db);
    return animal;
  }

  async updateById(animalId, payload) {
    const animal = await this.findOneById(animalId);
    if (!animal) {
      return;
    }

    const db = await this.readDB();
    const animalIndex = db.animals.findIndex(({ id }) => id === animalId);

    const updatedAnimal = {
      ...db.animals[animalIndex],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    db.animals[animalIndex] = updatedAnimal;
    await this.writeDB(db);
    return updatedAnimal;
  }

  async deleteById(animalId) {
    const animal = await this.findOneById(animalId);
    if (!animal) {
      return;
    }

    const db = await this.readDB();
    const filteredAnimals = db.animals.filter(({ id }) => id !== animalId);
    db.animals = filteredAnimals;
    await this.writeDB(db);
    return animalId;
  }
}

const animalRepository = new AnimalsRepository();

module.exports = animalRepository;
