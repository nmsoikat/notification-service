import { RABBITMQ_QUEUES } from "./rabbitmq.constants";

export type RabbitMQQueue = (typeof RABBITMQ_QUEUES)[keyof typeof RABBITMQ_QUEUES];
