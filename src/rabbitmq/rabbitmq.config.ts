import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQOptions } from './rabbitmq.interface';

// Sub
export function createRabbitMQConfig(
  options: RabbitMQOptions,
): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: options.queue,
      queueOptions: {
        durable: true,
      },
      noAck: false,
      prefetchCount: 10
    }
  };
}

