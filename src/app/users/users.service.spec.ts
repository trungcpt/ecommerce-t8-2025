import { TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AutoMockingModule } from '../../testing/auto-mocking/auto-mocking.module';
import { UsersModule } from './users.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await AutoMockingModule.createTestingModule({
      imports: [UsersModule],
    });

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    // const data = await service.getUsers({ itemPerPage: 10, page: 1 });
    // console.log('>>> data', data);
    expect(service).toBeDefined();
  });
});
