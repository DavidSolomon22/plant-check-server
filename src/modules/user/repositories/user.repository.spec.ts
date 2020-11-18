import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from '../schemas';
import { getModelToken } from '@nestjs/mongoose';

describe('UserRepository', () => {
  let repository: UserRepository;
  let model: PaginateModel<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken('User'),
          useValue: {
            paginate: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    model = module.get<PaginateModel<User>>(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('model should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create User', async () => {
    const mockUser = {
      _id: 'some id',
      email: 'oli@gmail.com',
      firstName: 'Olivier',
      surname: 'Giroud',
      __v: 0,
    };
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockUser as any);

    const createdUser = await repository.createUser({
      email: 'oli@gmail.com',
      passwordHash: 'somePasswordHash',
      firstName: 'Olivier',
      surname: 'Giroud',
    });

    expect(createdUser).toEqual(mockUser as User);
    expect(createdUser.passwordHash).toBeUndefined();
  });
});
