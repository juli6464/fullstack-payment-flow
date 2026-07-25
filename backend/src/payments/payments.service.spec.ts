import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { PaymentProvider } from './providers/payment.provider';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentProvider: PaymentProvider,
  ) {}

  async processPayment(dto: ProcessPaymentDto) {

    // Buscar la transacción
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: dto.transactionId,
      },
      include: {
        product: true,
      },
    });

    // Validar existencia
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // Validar estado
    if (transaction.status !== 'PENDING') {
      throw new BadRequestException(
        'Transaction has already been processed',
      );
    }

    // Procesar el pago (Mock)
    const paymentResponse =
      await this.paymentProvider.processPayment(dto);

    return paymentResponse;
  }
}