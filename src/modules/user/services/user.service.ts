import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from 'modules/user/repositories';
import { UserCreateDto, UserDto } from 'modules/user/dtos';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: UserCreateDto): Promise<UserDto> {
    return await this.userRepository.createUser(user);
  }

  async getPaginatedUsers(
    options: PaginateOptions,
    filterParams: any,
  ): Promise<PaginateResult<User>> {
    const { minAge, maxAge } = filterParams;
    const filterQuery = {
      age: { $gte: minAge, $lte: maxAge },
    };
    return await this.userRepository.getPaginatedUsers(options, filterQuery);
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.getUser(id);
  }
}
