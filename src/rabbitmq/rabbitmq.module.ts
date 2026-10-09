import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_CLIENT, RABBITMQ_QUEUES } from './rabbitmq.constants';
import { RabbitMQService } from './rabbitmq.service';

// @Global()
@Module({
  imports: [
    //Pub
    ClientsModule.register([
      {
        name: RABBITMQ_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: RABBITMQ_QUEUES.EMAIL,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [
    // {
    //   provide: RABBITMQ_CLIENT,
    //   useFactory: () => {
    //     return ClientProxyFactory.create({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: [
    //           process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    //         ],
    //         queue: RABBITMQ_QUEUES.EMAIL,

    //         queueOptions: {
    //           durable: true,
    //         },
    //         persistent: true,
    //       },
    //     });
    //   },
    // },
    RabbitMQService,
  ],
  exports: [
    RabbitMQService,
  ],
})
export class RabbitMQModule { }