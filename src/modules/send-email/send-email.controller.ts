import {
  Controller,
} from '@nestjs/common';

import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ackMessage, nackMessage } from 'src/rabbitmq/rabbitmq.ack';
import { RabbitMQEvents } from 'src/rabbitmq/rabbitmq.event';
import { SendEmailService } from './send-email.service';


@Controller()
export class SendEmailController {
  constructor(
    private emailService: SendEmailService
  ) { }

  @EventPattern(RabbitMQEvents.EMAIL.SEND)
  async handleEmail(
    @Payload() data: unknown,
    @Ctx() context: RmqContext,
  ) {

    try {
      // process
      await this.emailService.send(data);


      ackMessage(context);
    } catch {
      nackMessage(context);
    }
  }
}