import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get()
  async list(
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
    @Query('userId') userId?: string,
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(100, Math.max(1, Number(limitRaw) || 20));
    return this.svc.list({ page, limit, userId });
  }

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Post('mark-all-read')
  async markAllRead(@Body() body: { userId?: string }) {
    return this.svc.markAllRead(body?.userId);
  }

  @Post(':id/read')
  async markRead(@Param('id') id: string) {
    return this.svc.markRead(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
