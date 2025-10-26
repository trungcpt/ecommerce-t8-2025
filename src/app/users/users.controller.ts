import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './users.interface';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    const data = this.usersService.getUsers();
    return data;
  }

  @Get(':id')
  getUser(@Param('id') id: string): User {
    const data = this.usersService.getUser(id);
    return data;
  }

  @Post()
  createUser(@Body() user: User): User {
    this.usersService.createUser(user);
    return user;
  }
}
