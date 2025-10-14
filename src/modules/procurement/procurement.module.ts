import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcurementService } from './procurement.service';
import { ProcurementController } from './procurement.controller';
import { Procurement, ProcurementSchema } from './schemas/procurement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Procurement.name, schema: ProcurementSchema },
    ]),
  ],
  controllers: [ProcurementController],
  providers: [ProcurementService],
})
export class ProcurementModule {}
