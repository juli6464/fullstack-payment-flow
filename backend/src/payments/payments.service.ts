import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { PAYMENT_PORT } from './ports/payment.port';
import type { PaymentPort } from './ports/payment.port';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(PAYMENT_PORT)
    private readonly paymentProvider: PaymentPort,
  ) {}

  async processPayment(dto: ProcessPaymentDto) {
    // 1. Buscar la transacción
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: dto.transactionId,
      },
      include: {
        product: true,
      },
    });

    // 2. Validar que exista
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // 3. Validar que esté pendiente
    if (transaction.status !== 'PENDING') {
      throw new BadRequestException(
        'Transaction has already been processed',
      );
    }

    // 4. Procesar el pago (Mock por ahora)
    const paymentResponse = await this.paymentProvider.processPayment(dto);

    // 5. Devolver respuesta
    return paymentResponse;
  }
}