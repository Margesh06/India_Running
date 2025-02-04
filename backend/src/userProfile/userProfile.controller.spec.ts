import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from './userProfile.controller';
import { UserProfileService } from './userProfile.service';
import { UpdateUserProfileDto } from './userProfile.dto';
import { UserProfile } from '../entities/userProfile.entity'; 

describe('UserProfileController', () => {
  let controller: UserProfileController;
  let service: UserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        {
          provide: UserProfileService,
          useValue: {
            findByUserId: jest.fn(),
            updateUserProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
    service = module.get<UserProfileService>(UserProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile', async () => {
    const mockUserProfile: UserProfile = { 
      id: 1,
      user_id: {
          id: 1,
          fname: '',
          lname: '',
          email: '',
          password: '',
          reg_at: new Date(),
      },
      profileImage: 'test.jpg',
      address: 'Test Address', 
      bio: 'Test Bio',
      state: 'Test State',
      bloodGroup: 'A+',
      phone_no: 1234567890,
      emergencyContactName: 'Test Contact',
      emergencyContactNumber: 9876543210,
      country: 'Test Country',
      pincode: '123456',
      gender: 'Male',
      dob:new Date('2000-01-01') ,
      nationality: 'Test Nationality',
      height: 170,
      weight: 70,
      shoesize: '10',
      tshirtsize: 'M',
      raceType: 'Test Race',
      documentType: 'Test Document',
      frontPhoto: 'front_url',
      backPhoto: 'back_url',
    };


    jest.spyOn(service, 'findByUserId').mockResolvedValue(mockUserProfile);
    expect(await controller.getUserProfile(1)).toBe(mockUserProfile);
  });

  it('should update user profile', async () => {
    const updateDto: UpdateUserProfileDto = {
      profileImage: 'updated.jpg',
      user_id: 0
    };

    const updatedUserProfile: UserProfile = { 
      id: 1,
      user_id: {
          id: 1,
          fname: '',
          lname: '',
          email: '',
          password: '',
          reg_at: new Date(),
      },
      profileImage: 'updated.jpg',
      address: 'Test Address', 
      bio: 'Test Bio',
      state: 'Test State',
      bloodGroup: 'A+',
      phone_no: 1234567890,
      emergencyContactName: 'Test Contact',
      emergencyContactNumber: 9876543210,
      country: 'Test Country',
      pincode: '123456',
      gender: 'Male',
      dob: new Date('2000-01-01'),
      nationality: 'Test Nationality',
      height: 170,
      weight: 70,
      shoesize: '10',
      tshirtsize: 'M',
      raceType: 'Test Race',
      documentType: 'Test Document',
      frontPhoto: 'front_url',
      backPhoto: 'back_url',
    };

    jest.spyOn(service, 'updateUserProfile').mockResolvedValue(updatedUserProfile);
    expect(await controller.updateUserProfile(1, updateDto)).toBe(updatedUserProfile);
  });
});