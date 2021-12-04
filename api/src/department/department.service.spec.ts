import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../shared/test-utils/mongo';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  Department,
  DepartmentDocument,
  DepartmentSchema,
} from './schemas/department.schema';
import { Model } from 'mongoose';

describe('DepartmentService', () => {
  let departmentService: DepartmentService;
  let departmentModel: Model<DepartmentDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Department.name, schema: DepartmentSchema },
        ]),
      ],
      providers: [
        DepartmentService,
        {
          provide: getModelToken(Department.name),
          useValue: departmentModel,
        },
      ],
    }).compile();

    departmentService = module.get<DepartmentService>(DepartmentService);
    departmentModel = module.get<Model<DepartmentDocument>>(
      getModelToken(Department.name)
    );
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('service should be defined', () => {
    expect(departmentService).toBeDefined();
  });

  it('departmentModel should be defined', () => {
    expect(departmentModel).toBeDefined();
  });
});
