import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetEntry, BudgetEntrySchema } from './schemas/budget.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BudgetEntry.name, schema: BudgetEntrySchema }])],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
