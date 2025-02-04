import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserProfileService } from './userProfile.service';
import { UpdateUserProfileDto } from './userProfile.dto';

@Controller('userProfile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':userId')
  async getUserProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProfileService.findByUserId(userId);
  }

  @Patch(':userId')
  async updateUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userProfileService.updateUserProfile(userId, updateUserProfileDto);
  }
}
