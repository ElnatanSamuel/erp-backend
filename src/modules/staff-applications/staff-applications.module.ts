import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffApplicationsController } from './staff-applications.controller';
import { StaffApplicationsService } from './staff-applications.service';
import { StaffApplication, StaffApplicationSchema } from './schemas/staff-application.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StaffApplication.name, schema: StaffApplicationSchema },
    ]),
  ],
  controllers: [StaffApplicationsController],
  providers: [StaffApplicationsService],
  exports: [StaffApplicationsService],
})
export class StaffApplicationsModule {}
