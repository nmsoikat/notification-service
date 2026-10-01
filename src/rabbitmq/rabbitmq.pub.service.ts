import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';

import {
    AmqpConnectionManager,
    ChannelWrapper,
    connect,
} from 'amqp-connection-manager';

import { Channel, Options } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(RabbitMQService.name);

    private connection: AmqpConnectionManager;
    private channel: ChannelWrapper;

    private readonly exchangeName = 'notification.exchange';
    private readonly exchangeType = 'topic';

    async onModuleInit(): Promise<void> {
        const rabbitmqUrl = process.env.RABBITMQ_URL;

        if (!rabbitmqUrl) {
            throw new Error('RABBITMQ_URL is not configured');
        }

        // Create long-lived RabbitMQ connection
        this.connection = connect([rabbitmqUrl]);

        this.connection.on('connect', () => {
            this.logger.log('RabbitMQ connected');
        });

        this.connection.on('disconnect', (params) => {
            this.logger.error(
                `RabbitMQ disconnected: ${params.err?.message ?? 'Unknown error'}`,
            );
        });

        // Create channel
        this.channel = this.connection.createChannel({
            setup: async (channel: Channel) => {
                // Create exchange if it doesn't exist
                await channel.assertExchange(
                    this.exchangeName,
                    this.exchangeType,
                    {
                        durable: true,
                    },
                );

                this.logger.log(
                    `RabbitMQ exchange "${this.exchangeName}" is ready`,
                );
            },
        });

        // Make sure the channel setup has completed
        await this.channel.waitForConnect();
    }

    /**
     * Publish an event to RabbitMQ.
     *
     * @param routingKey Example: email.send
     * @param data Message payload
     */
    async publish<T>(
        routingKey: string,
        data: T,
    ): Promise<void> {
        const message = Buffer.from(
            JSON.stringify(data),
        );

        const options: Options.Publish = {
            persistent: true,
            contentType: 'application/json',
            contentEncoding: 'utf-8',
        };

        await this.channel.publish(
            this.exchangeName,
            routingKey,
            message,
            options,
        );
    }

    async onModuleDestroy(): Promise<void> {
        await this.channel?.close();
        await this.connection?.close();

        this.logger.log('RabbitMQ connection closed');
    }
}