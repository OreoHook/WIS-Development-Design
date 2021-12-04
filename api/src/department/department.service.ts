import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentModel
      .find()
      .sort({ isCompleted: 'asc', dueDate: 'asc' })
      .exec();
  }

  async create(dto: DepartmentDto): Promise<Department> {
    const createdCat = new this.departmentModel(dto);
    return createdCat.save();
  }

  async delete(id: string): Promise<Department> {
    return this.departmentModel.findOneAndDelete({ _id: id }).exec();
  }

  async findOneById(id: string): Promise<DepartmentDocument> {
    return this.departmentModel.findById(id).exec();
  }

  async update(id: string, dto: DepartmentDto): Promise<DepartmentDocument> {
    return this.departmentModel.findByIdAndUpdate(id, dto).exec();
  }
}
