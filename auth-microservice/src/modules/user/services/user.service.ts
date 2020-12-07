import { Injectable } from '@nestjs/common';
import { PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from 'modules/user/repositories';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: any): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  async getUser(id: string, options: PaginateOptions = {}): Promise<User> {
    return await this.userRepository.getUser(id, options);
  }

  async getOneByEmailWithHash(email: string): Promise<User> {
    return await this.userRepository.getOneByEmailWithHash(email);
  }
}
