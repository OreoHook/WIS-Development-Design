import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentDto } from './dto/department.dto';

import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getData() {
    return this.departmentService.findAll();
  }

  @Post()
  create(@Body() dto: DepartmentDto) {
    return this.departmentService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departmentService.findOneById(id);
  }

  @Patch(':id')
  async update(@Body() dto: DepartmentDto, @Param('id') id: string) {
    return this.departmentService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
     return this.departmentService.delete(id);
  }
}
