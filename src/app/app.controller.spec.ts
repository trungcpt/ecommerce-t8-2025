import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!222');
    });
  });

  // describe('getHello', () => {
  //   it('should return "Hello World!"', () => {
  //     // Chuẩn bị data test, thêm kết quả mong đợi
  //     const param1 = 2;
  //     const param2 = 'abc';
  //     const dataReturn = 'Hello World!';

  //     // Gọi logic để test
  //     const resultExpect = appController.getHello(param1, param2);

  //     // Trả về kết quả khi test
  //     expect(resultExpect).toBe(dataReturn);
  //   });

  //   it('should throw error when failed', () => {
  //     expect(appController.getHello()).toThrow(Error);
  //   });
  // });
});
