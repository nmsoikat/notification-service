### PUB
----------------------------------------------------------------
#### client.emit (handel by nest)
1. Connect with rabbitmq:
- Way 1: Import - Register
```
// rabbitmq.module.ts
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ.URL],
          queue: 'order-service.publisher',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
```

- Way 2: Providers - ClientProxy
```
// rabbitmq.module.ts
@Module({
  providers: [
    {
      provide: RABBITMQ_CLIENT,
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              process.env.RABBITMQ_URL || 'amqp://localhost:5672',
            ],
            queue: RABBITMQ_QUEUES.EMAIL,
            queueOptions: {
              durable: true,
            },
            persistent: true,
          },
        });
      },
    },
    RabbitMQService,
  ],
  exports: [
    RabbitMQService,
  ],
})
export class RabbitMQModule { }
```

2. Event Emit:
```
// rabbitmq.service.ts
@Injectable()
export class RabbitMQService implements OnModuleInit {
  constructor(
    @Inject(RABBITMQ_CLIENT)
    private readonly client: ClientProxy,
  ) { }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  emit<TData = unknown>(
    pattern: string,
    data: TData,
  ): void {
    this.client.emit(pattern, data);
  }
}
```

```
// notification.service.ts
// use rabbitmq service reusable emit function
    this.rabbitMQ.emit(
      RABBITMQ.ROUTING_KEYS.ORDER_CREATED,
      order,
    );
```

#### channel.publish (handel by amqplib)
1. connection and service in one place
```
//rabbitmq.module.ts
@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
```

```
// rabbitmq.service.ts
@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: AmqpConnectionManager;
  private channel: ChannelWrapper;

  async onModuleInit() {
    this.connection = connect([
      process.env.RABBITMQ_URL!,
    ]);

    this.channel = this.connection.createChannel({
      setup: async (channel: Channel) => {
        await channel.assertExchange(
          'notification.exchange',
          'topic',
          { durable: true },
        );
      },
    });
  }

  async publish(
    routingKey: string,
    data: unknown,
  ) {
    await this.channel.publish(
      'notification.exchange',
      routingKey,
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true,
      },
    );
  }
}
```

```
// notification.service.ts
await this.rabbitMQService.publish(
  'email.send',
  {
    to: 'user@example.com',
    subject: 'Welcome',
    body: 'Hello!',
  },
);
```


### SUB
----------------------------------------------------------------
1. Connect with rabbitmq: Create microservice with rabbitmq configuration and queue name
```
// main.ts
app.connectMicroservice({...}) //email_queue
app.connectMicroservice({...}) //sms_queue

await app.startAllMicroservices();
```
Rabbitmq will create all queue if not exist.


2. Event Listener: Receiving event and Acknowledgement

```
// send-email.controller.ts
@EventPattern(RabbitMQEvents.EMAIL.SEND)
async handleEmail(
@Payload() data: unknown,
@Ctx() context: RmqContext,
) {
try {
    // process
    await this.emailService.send(data);

    ackMessage(context); //reusable ack function
} catch {
    nackMessage(context);
}
}
```