// import { RabbitMQOptions } from "./rabbitmq.interface";

export const RABBITMQ_CLIENT = 'RABBITMQ_CLIENT';
export const RABBITMQ_EXCHANGE = 'notification.events';

export const RABBITMQ_QUEUES = {
  EMAIL: 'notification.email',
  SMS: 'notification.sms',
  PUSH: 'notification.push',
  POPUP: 'notification.popup',
} as const;

// multiple queue load at once
// export const RABBITMQ_CONSUMERS: RabbitMQOptions[] = [
//   {
//     queue: RABBITMQ_QUEUES.EMAIL,
//     routingKey: 'notification.email',
//   },
//   {
//     queue: RABBITMQ_QUEUES.SMS,
//     routingKey: 'notification.sms',
//   },
//   {
//     queue: RABBITMQ_QUEUES.PUSH,
//     routingKey: 'notification.push',
//   },
//   {
//     queue: RABBITMQ_QUEUES.POPUP,
//     routingKey: 'notification.popup',
//   },
// ];