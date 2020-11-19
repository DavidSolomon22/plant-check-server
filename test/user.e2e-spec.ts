/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'utils/testing-utils';
import { UserModule } from 'modules/user';
import { AuthModule } from 'modules/auth';
import { UtilsService } from 'utils/services';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let authCookies: string;

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
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    await request(server).post('/auth/register').send({
      email: 'dav.soli22@gmail.com',
      password: 'enter123',
    });
    const response = await request(server).post('/auth/login').send({
      email: 'dav.soli22@gmail.com',
      password: 'enter123',
    });
    authCookies = UtilsService.extractCookiesFromHeaders(response.headers);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  it('/users (GET)', async () => {
    return request(server)
      .get('/users')
      .set('Cookie', [authCookies])
      .expect(200);
  });
});
