import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user object', async () => {
      const user = { id: 1, fname: 'John', lname: 'Doe', email: 'john@example.com', password: 'hashedPassword', reg_at: new Date() };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      // expect(await controller.getUser(1)).toEqual(user);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  // describe('updateUser', () => {
  //   it('should update and return the updated user', async () => {
  //     const updateUserDto: UpdateUserDto = { fname: 'John', lname: 'Doe', email: 'john@example.com' };
  //     const updatedUser = { id: 1, ...updateUserDto, password: 'hashedPassword', reg_at: new Date() };
      
  //     jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

  //     expect(await controller.updateUser(1, updateUserDto)).toEqual(updatedUser);
  //     expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  //   });
  // });
});
