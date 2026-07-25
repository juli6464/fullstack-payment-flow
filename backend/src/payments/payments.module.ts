import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentProvider } from './providers/payment.provider';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentProvider,
  ],
})
export class PaymentsModule {}