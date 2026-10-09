import { RabbitMQQueue } from "./rabbitmq.type";

export interface RabbitMQOptions {
    queue: RabbitMQQueue;
    routingKey?: string;
}
