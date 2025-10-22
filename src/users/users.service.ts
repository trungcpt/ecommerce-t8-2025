import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      firstName: 'trung',
      lastName: 'cpt',
      email: 'trungcpt@gmail.com',
      password: '123456',
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const userFound = this.users.find((user) => user.id === id);
    if (!userFound) throw new NotFoundException('User not found');

    return userFound;
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }
}
