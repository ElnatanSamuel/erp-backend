import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { Training, TrainingSchema } from './schemas/training.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Training.name, schema: TrainingSchema }])],
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
