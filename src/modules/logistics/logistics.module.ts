import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticsService } from './logistics.service';
import { LogisticsController } from './logistics.controller';
import { Logistic, LogisticSchema } from './schemas/logistic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Logistic.name, schema: LogisticSchema },
    ]),
  ],
  controllers: [LogisticsController],
  providers: [LogisticsService],
})
export class LogisticsModule {}
