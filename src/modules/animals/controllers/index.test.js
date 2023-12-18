const { getMockReq, getMockRes } = require('@jest-mock/express');
const { AnimalController } = require('.');
const HttpError = require('../../common/models/HttpError');

describe('animalsController', () => {
  describe('getAnimalById', () => {
    it('returns animal with given id', async () => {
      const animal = {
        deletedAt: null,
        _id: 'test-id',
        name: 'AnimalToRemove',
        age: 3,
        isVaccinated: false,
        gender: 'male',
        species: 'cat',
        createdAt: '2023-11-29T18:19:51.322Z',
        updatedAt: '2023-11-29T18:59:10.650Z',
      };
      const req = getMockReq({
        params: {
          animalId: 'test-id',
        },
      });

      const animalsService = {
        getOneById: jest.fn().mockResolvedValue(animal),
      };

      const { res } = getMockRes();
      const animalsController = new AnimalController(animalsService);

      await animalsController.getAnimalById(req, res);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Successfully retrieved animal!',
        data: animal,
      });
    });

    it('throws an error if animal does not exist', async () => {
      const req = getMockReq({
        params: {
          animalId: 'none',
        },
      });

      const animalsService = {
        getOneById: () => 2,
      };

      jest.spyOn(animalsService, 'getOneById').mockRejectedValue(2);

      const { res } = getMockRes();
      const animalsController = new AnimalController(animalsService);
      expect(animalsController.getAnimalById(req, res)).rejects.toThrow();
    });
  });
});
