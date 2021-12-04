import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorModule } from './professor/professor.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    // change to Atlas cloud
    MongooseModule.forRoot(
      'mongodb+srv://ded-cat:helloworldded@cluster0.d9kej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    ProfessorModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
