import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Circular, CircularSchema } from './schemas/circular.schema';
import { CircularsService } from './circulars.service';
import { CircularsController } from './circulars.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Circular.name, schema: CircularSchema },
    ]),
  ],
  controllers: [CircularsController],
  providers: [CircularsService],
})
export class CircularsModule {}
