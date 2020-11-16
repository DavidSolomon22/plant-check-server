import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';
import { UserCreateDto, UserDto } from '../dtos';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: PaginateModel<User>,
  ) {}

  async createUser(user: UserCreateDto): Promise<UserDto> {
    const userForCreation = new this.userModel(user);
    const createdUser = await userForCreation.save();
    createdUser.passwordHash = undefined;
    return await createdUser;
  }

  // done
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // ogarnac populate + parsowanie populate pipe, zeby mozna bylo tworzyc obiekty (dla zagniezdzonych pol)
  async getPaginatedUsers(
    options: PaginateOptions,
    filterQuery: FilterQuery<User> = {},
  ): Promise<PaginateResult<User>> {
    return await this.userModel.paginate(filterQuery, options);
  }

  // ogarnac populate
  async getUser(id: string, options: PaginateOptions = {}): Promise<User> {
    const { select, populate } = options;
    let { lean } = options;
    if (lean === undefined || lean === null) {
      lean = true;
    }
    return await this.userModel
      .findById(id)
      .select(select)
      .populate(populate)
      .lean(lean);
  }

  // ogarnac populate
  async updateUser(
    id: string,
    user: UserUpdateDto,
    options: PaginateOptions,
  ): Promise<User> {
    const { select, populate } = options;
    let { lean } = options;
    if (lean === undefined || lean === null) {
      lean = true;
    }
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
        context: 'query',
      })
      .select(select)
      .populate(populate)
      .lean(lean);
  }

  // done
  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
