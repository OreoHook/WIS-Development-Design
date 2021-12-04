import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfessorDto } from './dto/professor.dto';

import { ProfessorService } from './professor.service';

@Controller('professors')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  getData() {
    return this.professorService.findAll();
  }

  @Post()
  create(@Body() dto: ProfessorDto) {
    return this.professorService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.professorService.findOneById(id);
  }

  @Patch(':id')
  async update(@Body() dto: ProfessorDto, @Param('id') id: string) {
    return this.professorService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.professorService.delete(id);
  }
}
