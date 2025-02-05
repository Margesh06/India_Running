import { Controller, Get,Req,UseGuards, Param, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get(':id')
  // async getUser(@Param('id') id: number) {
  //   return this.usersService.findOne(id);
  // }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/updateRole')
  async updateUserRole(@Param('id') id: number, @Body() updateRoleDto: { role: string }) {
    return this.usersService.updateUserRole(id, updateRoleDto.role);
  }

  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrentUser(@Req() req: Request) {
    console.log("Extracted user ID from JWT:", req.user.id); 
    return this.usersService.findOne(req.user.id); 
  }
}
