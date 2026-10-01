import { Inject, Injectable } from '@nestjs/common';
import { CreateSendEmailDto } from './dto/create-send-email.dto';
import { UpdateSendEmailDto } from './dto/update-send-email.dto';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RabbitMQEvents } from 'src/rabbitmq/rabbitmq.event';

@Injectable()
export class SendEmailService {
  send(data: any) {
    return "Ok. Mail sent"
  }

  create(createSendEmailDto: CreateSendEmailDto) {
    return 'This action adds a new sendEmail';
  }

  findAll() {
    return `This action returns all sendEmail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sendEmail`;
  }

  update(id: number, updateSendEmailDto: UpdateSendEmailDto) {
    return `This action updates a #${id} sendEmail`;
  }

  remove(id: number) {
    return `This action removes a #${id} sendEmail`;
  }
}
