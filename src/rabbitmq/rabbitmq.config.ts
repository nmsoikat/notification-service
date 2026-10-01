import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_EXCHANGE,
  RABBITMQ_QUEUES,
  RabbitMQQueue,
} from './rabbitmq.constants';

export interface RabbitMQOptions {
  queue: RabbitMQQueue;
  routingKey?: string;
}

export function createRabbitMQConfig(
  options: RabbitMQOptions,
): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URL || 'amqp://localhost:5672',
      ],
      queue: options.queue,
      exchange: process.env.RABBITMQ_EXCHANGE || RABBITMQ_EXCHANGE,
      exchangeType: process.env.RABBITMQ_EXCHANGE_TYPE || 'topic',
      routingKey: options.routingKey,
      wildcards: true,
      noAck: false,
      prefetchCount: Number(
        process.env.RABBITMQ_PREFETCH || 10,
      ),
      queueOptions: {
        durable: true,
      },
      persistent: true,
    },
  };
}

export const RABBITMQ_CONSUMERS: RabbitMQOptions[] = [
  {
    queue: RABBITMQ_QUEUES.EMAIL,
    routingKey: 'notification.email',
  },
  {
    queue: RABBITMQ_QUEUES.SMS,
    routingKey: 'notification.sms',
  },
  {
    queue: RABBITMQ_QUEUES.PUSH,
    routingKey: 'notification.push',
  },
  {
    queue: RABBITMQ_QUEUES.POPUP,
    routingKey: 'notification.popup',
  },
];