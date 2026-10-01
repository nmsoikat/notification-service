import { Module } from '@nestjs/common';
import { SendEmailModule } from './modules/send-email/send-email.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    RabbitMQModule,
    SendEmailModule,
    NotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
