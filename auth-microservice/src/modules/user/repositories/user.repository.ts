import { PaginateModel, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: PaginateModel<User>,
  ) {}

  async createUser(user: any): Promise<User> {
    const createdUser = await this.userModel.create(user);
    delete createdUser.passwordHash;
    return createdUser;
  }

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

  async getOneByEmailWithHash(email: string): Promise<any> {
    return await this.userModel
      .findOne({ email: email })
      .select('firstName surname email passwordHash')
      .lean()
      .exec();
  }
}
