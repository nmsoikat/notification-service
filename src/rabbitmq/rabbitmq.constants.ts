export const RABBITMQ_CLIENT = 'RABBITMQ_CLIENT';

export const RABBITMQ_EXCHANGE = 'notification.events';

export const RABBITMQ_QUEUES = {
  EMAIL: 'notification.email',
  SMS: 'notification.sms',
  PUSH: 'notification.push',
  POPUP: 'notification.popup',
} as const;

export type RabbitMQQueue =
  (typeof RABBITMQ_QUEUES)[keyof typeof RABBITMQ_QUEUES];