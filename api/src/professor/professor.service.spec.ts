import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorService } from './professor.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../shared/test-utils/mongo';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  Professor,
  ProfessorDocument,
  ProfessorSchema,
} from './schemas/professor.schema';
import { Model } from 'mongoose';

describe('ProfessorService', () => {
  let professorService: ProfessorService;
  let professorModel: Model<ProfessorDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Professor.name, schema: ProfessorSchema },
        ]),
      ],
      providers: [
        ProfessorService,
        {
          provide: getModelToken(Professor.name),
          useValue: professorModel,
        },
      ],
    }).compile();

    professorService = module.get<ProfessorService>(ProfessorService);
    professorModel = module.get<Model<ProfessorDocument>>(
      getModelToken(Professor.name)
    );
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('service should be defined', () => {
    expect(professorService).toBeDefined();
  });

  it('professorModel should be defined', () => {
    expect(professorModel).toBeDefined();
  });
});
