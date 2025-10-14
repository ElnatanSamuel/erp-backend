import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { SalaryDefinition, SalaryDefinitionSchema } from './schemas/salary-definition.schema';
import { TaxDefinition, TaxDefinitionSchema } from './schemas/tax-definition.schema';
import { Payslip, PayslipSchema } from './schemas/payslip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalaryDefinition.name, schema: SalaryDefinitionSchema },
      { name: TaxDefinition.name, schema: TaxDefinitionSchema },
      { name: Payslip.name, schema: PayslipSchema },
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
