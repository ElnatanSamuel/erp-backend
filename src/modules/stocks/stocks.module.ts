import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StockItem, StockItemSchema } from './schemas/stock.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: StockItem.name, schema: StockItemSchema }])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
