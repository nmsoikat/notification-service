import { RmqContext } from '@nestjs/microservices';

export function ackMessage(context: RmqContext): void {
  const channel = context.getChannelRef();
  const message = context.getMessage();

  channel.ack(message);
}

export function nackMessage(
  context: RmqContext,
  requeue = true,
): void {
  const channel = context.getChannelRef();
  const message = context.getMessage();

  channel.nack(message, false, requeue);
}