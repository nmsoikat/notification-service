import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { RabbitMQModule } from "src/rabbitmq/rabbitmq.module";

@Module({
    imports: [RabbitMQModule],
    controllers: [NotificationController],
    providers: [NotificationService]
})
export class NotificationModule { }