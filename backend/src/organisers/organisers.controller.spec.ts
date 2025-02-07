import { Test, TestingModule } from '@nestjs/testing';
import { OrganisersController } from './organiser.controller';

describe('OrganisersController', () => {
  let controller: OrganisersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisersController],
    }).compile();

    controller = module.get<OrganisersController>(OrganisersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
