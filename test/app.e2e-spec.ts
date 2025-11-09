import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // describe('get detail product', () => {
  //   let signUpSuccess;
  //   describe('/sign-up', () => {
  //     it('return token when success', () => {
  //       // Chuẩn bị data test, thêm kết quả mong đợi
  //       const dataReturn = { accessToken: 'abc' };

  //       // Gọi logic để test
  //       const dataSignUp = request(app.getHttpServer())
  //         .get('/')
  //         .expect(200)
  //         .expect('Hello World!');

  //       signUpSuccess = dataSignUp;

  //       // Trả về kết quả khi test
  //       expect(dataSignUp).toBe(dataReturn);
  //     });
  //     it('throw err when failed', () => {});
  //   });

  //   describe('/sign-in', () => {
  //     it('return token when success', () => {
  //       // Chuẩn bị data test, thêm kết quả mong đợi
  //       const dataReturn = { accessToken: 'abc' };

  //       // Gọi logic để test
  //       const dataSignIn = request(app.getHttpServer())
  //         .post('/sign-in')
  //         .send(signUpSuccess)
  //         .expect(200)
  //         .expect('Hello World!');

  //       // Trả về kết quả khi test
  //       expect(dataSignIn).toBe(dataReturn);
  //     });
  //   });
  // });
});
