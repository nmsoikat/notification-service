import { Injectable } from "@nestjs/common";
import { RabbitMQEvents } from "src/rabbitmq/rabbitmq.event";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";

@Injectable()
export class NotificationService {
    constructor(
        private readonly rabbitmq: RabbitMQService,
    ) { }

    async sendEmail(dto: any) {
        const notificationId = crypto.randomUUID();

        this.rabbitmq.emit(
            RabbitMQEvents.EMAIL.SEND,
            {
                notificationId,
                ...dto,
            },
        );

        return {
            success: true,
            message: 'Email queued successfully',
            data: {
                notificationId,
            },
        };
    }
}