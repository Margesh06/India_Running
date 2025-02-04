import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UserProfile } from '../entities/userProfile.entity';
import { UpdateUserProfileDto } from './userProfile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async findByUserId(userId: number): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOne({ where: { user_id: Equal(userId) } });
    if (!profile) {
      throw new NotFoundException('User Profile not found');
    }
    return profile;
  }

  async findById(userId: number): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOne({ where: { id: Equal(userId) } });
    if (!profile) {
      throw new NotFoundException('User Profile not found');
    }
    return profile;
  }

  async updateUserProfile(userId: number, updateData: UpdateUserProfileDto): Promise<UserProfile> {
    console.log(`Updating user profile for userId: ${userId}`);
    console.log('Received update data:', updateData);

    const profile = await this.findById(userId);
    console.log('Existing profile:', profile);

    for (const key in updateData) {
        if (updateData[key] !== undefined) {
            profile[key] = updateData[key];
        }
    }

    const updatedProfile = await this.userProfileRepository.save(profile);
    console.log('Updated profile:', updatedProfile);

    return updatedProfile;
}


}
