import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RabbitMQEvents } from './rabbitmq/rabbitmq.event';
import { createRabbitMQConfig } from './rabbitmq/rabbitmq.config';
import { RABBITMQ_QUEUES } from './rabbitmq/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
  //     queue: 'email_queue',
  //     noAck: false, // Enable manual acknowledgements
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
  // await app.startAllMicroservices();

  // for (const consumer of RABBITMQ_CONSUMERS) {
  //   app.connectMicroservice<MicroserviceOptions>(
  //     createRabbitMQConfig(consumer),
  //   );
  // }

  app.connectMicroservice<MicroserviceOptions>(
    createRabbitMQConfig({
      queue: RABBITMQ_QUEUES.EMAIL,
      routingKey: RabbitMQEvents.EMAIL.SEND,
    }),
  );

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);

  console.log("Running:", process.env.PORT);
  console.log('RabbitMQ email consumer started');

}
bootstrap();
