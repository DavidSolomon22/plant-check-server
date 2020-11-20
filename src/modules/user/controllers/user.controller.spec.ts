import { Test, TestingModule } from '@nestjs/testing';
import { PaginateResult } from 'mongoose';
import { UserService } from 'modules/user/services';
import { UserRepository } from 'modules/user/repositories';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';
import { createMock } from '@golevelup/ts-jest';
import { User } from 'modules/user/schemas';
import { UserController } from '.';
import { AuthService } from 'modules/auth/services';

const mockedPaginatedUsers: PaginateResult<any> = {
  docs: [
    {
      _id: 'some id',
      email: 'olivier.giroud@gmail.com',
      firstName: 'Olivier',
      surname: 'Giroud',
      __v: 0,
    },
    {
      _id: 'some id 2',
      email: 'eden.hazard@gmail.com',
      firstName: 'Eden',
      surname: 'Hazard',
      __v: 0,
    },
    {
      _id: 'some id 3',
      email: 'didier.drogba@gmail.com',
      firstName: 'Didier',
      surname: 'Drogba',
      __v: 0,
    },
  ],
  hasNextPage: false,
  hasPrevPage: false,
  limit: 20,
  pagingCounter: 1,
  totalDocs: 3,
  totalPages: 1,
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getPaginatedUsers: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return paginated users', async () => {
      jest
        .spyOn(service, 'getPaginatedUsers')
        .mockImplementationOnce(async () => mockedPaginatedUsers);
      const paginatedUsers = await controller.getUsers();
      expect(paginatedUsers).toStrictEqual(mockedPaginatedUsers);
      expect(service.getPaginatedUsers).toBeCalledWith({}, {});
      expect(service.getPaginatedUsers).toBeCalledTimes(1);
    });
  });

  describe('getUser', () => {
    it('should return one user', async () => {});
    it('should throw error when user not found', async () => {});
  });

  describe('updateUser', () => {
    it('should return one updated user', async () => {});
    it('should throw error when user not found', async () => {});
  });

  describe('deleteUser', () => {
    it('should return one deleted user', async () => {});
    it('should throw error when user not found', async () => {});
  });
});
