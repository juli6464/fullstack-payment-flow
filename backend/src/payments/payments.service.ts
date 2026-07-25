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
        customer: true,
        delivery: true,
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

    // 4. Procesar el pago en Wompi
    const paymentResponse =
      await this.paymentProvider.processPayment(
        dto,
        transaction,
      );

    // 5. Actualizar la transacción local
    await this.prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        wompiTransactionId:
          paymentResponse.providerReference,
        status: paymentResponse.status,
      },
    });

    // 6. Descontar stock únicamente si el pago fue aprobado
    if (paymentResponse.status === 'APPROVED') {
      await this.prisma.product.update({
        where: {
          id: transaction.productId,
        },
        data: {
          stock: {
            decrement: 1,
          },
        },
      });
    }

    // 7. Responder al cliente
    return paymentResponse;
  }
}