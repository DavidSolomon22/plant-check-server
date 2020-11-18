/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'utils/testing-utils';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'modules/user/schemas';
import { AppModule } from 'modules/app';
import { UserModule } from 'modules/user';
import { AuthModule } from 'modules/auth';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
        UserModule,
        AuthModule,
        // MongooseModule.forFeatureAsync([
        //   {
        //     name: User.name,
        //     useFactory: () => {
        //       const schema = UserSchema;
        //       schema.plugin(require('mongoose-paginate-v2'));
        //       schema.plugin(require('mongoose-unique-validator'), {
        //         message: 'User with email {VALUE} already exists.',
        //       });
        //       return schema;
        //     },
        //   },
        // ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = await app.listen(3000);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  it('/users (GET)', async () => {
    console.log('url :>> ', await app.getUrl());
    return request(server).get('/users').expect(200);
  });
});
