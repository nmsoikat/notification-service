import {
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { RABBITMQ_CLIENT } from './rabbitmq.constants';

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

  async send<TResponse = unknown, TData = unknown>(
    pattern: string,
    data: TData,
  ): Promise<TResponse> {
    return firstValueFrom(
      this.client.send<TResponse, TData>(
        pattern,
        data,
      ),
    );
  }
}