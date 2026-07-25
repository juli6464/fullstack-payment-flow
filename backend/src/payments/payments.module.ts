import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentProvider } from './providers/payment.provider';
import { PAYMENT_PORT } from './ports/payment.port';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: PAYMENT_PORT,
      useClass: PaymentProvider,
    },
  ],
})
export class PaymentsModule {}