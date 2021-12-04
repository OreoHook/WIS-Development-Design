import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor, ProfessorDocument } from './schemas/professor.schema';
import { ProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectModel(Professor.name)
    private professorModel: Model<ProfessorDocument>
  ) {}

  async findAll(): Promise<Professor[]> {
    return this.professorModel
      .find()
      .sort({ isCompleted: 'asc', dueDate: 'asc' })
      .exec();
  }

  async create(dto: ProfessorDto): Promise<Professor> {
    const createdCat = new this.professorModel(dto);
    return createdCat.save();
  }

  async delete(id: string): Promise<Professor> {
    return this.professorModel.findOneAndDelete({ _id: id }).exec();
  }

  async findOneById(id: string): Promise<ProfessorDocument> {
    return this.professorModel.findById(id).exec();
  }

  async update(id: string, dto: ProfessorDto): Promise<ProfessorDocument> {
    return this.professorModel.findByIdAndUpdate(id, dto).exec();
  }
}
