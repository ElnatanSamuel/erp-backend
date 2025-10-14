import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentVoucherService } from './payment-voucher.service';
import { PaymentVoucherController } from './payment-voucher.controller';
import { PaymentVoucher, PaymentVoucherSchema } from './schemas/payment-voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentVoucher.name, schema: PaymentVoucherSchema },
    ]),
  ],
  controllers: [PaymentVoucherController],
  providers: [PaymentVoucherService],
  exports: [PaymentVoucherService],
})
export class PaymentVoucherModule {}
