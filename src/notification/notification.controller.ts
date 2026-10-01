import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
    ) { }

    @Post('email')
    async sendEmail(
        @Body() dto: any,
    ) {
        return this.notificationService.sendEmail(dto);
    }
}