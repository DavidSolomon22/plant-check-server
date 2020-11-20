import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ParseArrayPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserUpdateDto } from 'modules/user/dtos';
import { ParseSortParamsPipe } from 'pipes';
import { UserService } from 'modules/user/services';
import { JwtAuthGuard } from 'guards';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber?: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize?: number,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[], // check on real populate
    @Query(
      'orderBy',
      new DefaultValuePipe([]),
      ParseArrayPipe,
      new ParseSortParamsPipe(),
    )
    orderBy?: string,
    @Query('minAge', new DefaultValuePipe(0), ParseIntPipe)
    minAge?: number,
    @Query('maxAge', new DefaultValuePipe(1000), ParseIntPipe)
    maxAge?: number,
  ) {
    const options = {
      page: pageNumber,
      limit: pageSize,
      select: fields,
      populate: populates,
      sort: orderBy,
    };
    const filterParams = {
      minAge,
      maxAge,
    };
    return await this.userService.getPaginatedUsers(options, filterParams);
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[], // check on real populate
  ) {
    const options = {
      select: fields,
      populate: populates,
    };
    const user = await this.userService.getUser(id, options);
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[], // check on real populate
  ) {
    const options = {
      select: fields,
      populate: populates,
    };
    const user = await this.userService.updateUser(id, userUpdateDto, options);
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException();
    } else {
      return;
    }
  }
}
